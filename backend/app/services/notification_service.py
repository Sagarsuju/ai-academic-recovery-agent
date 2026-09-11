import os
import uuid
import logging
import asyncio
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from fastapi import WebSocket
from sqlalchemy import text
from app.database.database import SessionLocal

logger = logging.getLogger("notifications")

class ConnectionManager:
    """Manages active live WebSocket connections per user_id."""
    def __init__(self):
        # Map of user_id -> list of active WebSocket connections
        self.active_connections: Dict[str, List[WebSocket]] = {}
        self._loop: Optional[asyncio.AbstractEventLoop] = None

    def set_loop(self, loop: asyncio.AbstractEventLoop):
        self._loop = loop

    async def connect(self, user_id: str, websocket: WebSocket):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = []
        self.active_connections[user_id].append(websocket)
        logger.info(f"WebSocket connected for user: {user_id} (active: {len(self.active_connections[user_id])})")

    def disconnect(self, user_id: str, websocket: WebSocket):
        if user_id in self.active_connections:
            if websocket in self.active_connections[user_id]:
                self.active_connections[user_id].remove(websocket)
            if not self.active_connections[user_id]:
                del self.active_connections[user_id]
        logger.info(f"WebSocket disconnected for user: {user_id}")

    async def send_personal_message(self, user_id: str, message: dict):
        if user_id in self.active_connections:
            dead_connections = []
            for connection in self.active_connections[user_id]:
                try:
                    await connection.send_json(message)
                except Exception as e:
                    logger.warning(f"Failed sending WebSocket message to {user_id}: {e}")
                    dead_connections.append(connection)
            for dead in dead_connections:
                self.disconnect(user_id, dead)

    async def broadcast(self, message: dict):
        for user_id in list(self.active_connections.keys()):
            await self.send_personal_message(user_id, message)

    def dispatch_live_notification(self, user_id: str, notification: dict):
        """Thread-safe dispatcher that pushes live WebSocket message if user is connected."""
        if user_id not in self.active_connections:
            return

        payload = {
            "event": "new_notification",
            "notification": notification
        }

        try:
            loop = self._loop or asyncio.get_event_loop()
            if loop.is_running():
                asyncio.run_coroutine_threadsafe(self.send_personal_message(user_id, payload), loop)
            else:
                loop.run_until_complete(self.send_personal_message(user_id, payload))
        except Exception as e:
            # Create a quick task if in async context
            try:
                asyncio.create_task(self.send_personal_message(user_id, payload))
            except Exception:
                logger.debug(f"Could not push WebSocket notification in current thread: {e}")

manager = ConnectionManager()

def send_email_notification(recipient_email: str, title: str, message: str) -> bool:
    """
    Safely dispatches email alerts.
    If SMTP credentials are not configured in environment, safely logs in development mode
    without raising exceptions or interrupting execution.
    """
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = os.getenv("SMTP_PORT")
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")

    # Safe stub in development mode
    if not smtp_server or not smtp_user:
        logger.info(
            f"[DEV EMAIL STUB] Simulated dispatch to <{recipient_email}> | "
            f"Subject: '{title}' | Body: '{message[:100]}...'"
        )
        return True

    try:
        import smtplib
        from email.mime.text import MIMEText
        from email.mime.multipart import MIMEMultipart

        msg = MIMEMultipart()
        msg["From"] = smtp_user
        msg["To"] = recipient_email
        msg["Subject"] = title
        msg.attach(MIMEText(message, "plain"))

        port = int(smtp_port) if smtp_port else 587
        with smtplib.SMTP(smtp_server, port, timeout=5) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        logger.info(f"Email sent successfully to {recipient_email}")
        return True
    except Exception as e:
        logger.warning(f"SMTP delivery failed to {recipient_email} ({e}); continuing safely.")
        return False

def create_notification(
    user_id: str,
    type: str,
    title: str,
    message: str,
    link: Optional[str] = None,
    recipient_email: Optional[str] = None
) -> dict:
    """
    Persists notification to Notification table, pushes live via WebSocket to connected user,
    and stubs safe email alert.
    """
    notif_id = f"n-{uuid.uuid4().hex[:8]}"
    now_iso = datetime.now(timezone.utc).isoformat()
    type_upper = type.upper()

    db = SessionLocal()
    try:
        # Determine email from users table if not passed
        if not recipient_email:
            user_row = db.execute(
                text("SELECT email FROM users WHERE id = :uid"),
                {"uid": user_id}
            ).fetchone()
            if user_row:
                recipient_email = user_row[0]

        # Insert into Notification table
        insert_sql = text("""
            INSERT INTO notifications (
                id, user_id, type, title, message, is_read, link, created_at
            ) VALUES (
                :id, :user_id, :type, :title, :message, :is_read, :link, :created_at
            )
        """)
        db.execute(insert_sql, {
            "id": notif_id,
            "user_id": user_id,
            "type": type_upper,
            "title": title,
            "message": message,
            "is_read": False,
            "link": link,
            "created_at": now_iso
        })
        db.commit()
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to persist notification into database: {e}")
    finally:
        db.close()

    notif_data = {
        "id": notif_id,
        "user_id": user_id,
        "type": type_upper,
        "title": title,
        "message": message,
        "is_read": False,
        "link": link,
        "created_at": now_iso
    }

    # 1. Push live via WebSocket if user is connected
    manager.dispatch_live_notification(user_id=user_id, notification=notif_data)

    # 2. Safely trigger stubbed email
    if recipient_email:
        send_email_notification(recipient_email=recipient_email, title=title, message=message)

    return notif_data

def get_user_notifications(user_id: str) -> List[Dict[str, Any]]:
    """Retrieve notifications for user from the Notification table."""
    db = SessionLocal()
    try:
        rows = db.execute(
            text("""
                SELECT id, user_id, type, title, message, is_read, link, created_at
                FROM notifications
                WHERE user_id = :uid
                ORDER BY created_at DESC
            """),
            {"uid": user_id}
        ).fetchall()

        results = []
        for r in rows:
            results.append({
                "id": r[0],
                "user_id": r[1],
                "type": r[2],
                "title": r[3],
                "message": r[4],
                "is_read": bool(r[5]),
                "link": r[6],
                "created_at": str(r[7])
            })
        return results
    except Exception as e:
        logger.error(f"Failed to fetch notifications for {user_id}: {e}")
        return []
    finally:
        db.close()

def mark_notification_as_read(notification_id: str) -> bool:
    """Mark a notification as read in the database."""
    db = SessionLocal()
    try:
        db.execute(
            text("UPDATE notifications SET is_read = TRUE WHERE id = :nid"),
            {"nid": notification_id}
        )
        db.commit()
        return True
    except Exception as e:
        db.rollback()
        logger.error(f"Failed marking notification {notification_id} as read: {e}")
        return False
    finally:
        db.close()

def send_alert_notification(recipient: str, title: str, message: str) -> bool:
    """Legacy helper function maintained for backward compatibility."""
    create_notification(
        user_id=recipient,
        type="WARNING",
        title=title,
        message=message
    )
    return True
