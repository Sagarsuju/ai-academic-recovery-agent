import logging
from typing import List, Optional
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query, HTTPException
from app.services.notification_service import (
    manager,
    create_notification,
    get_user_notifications,
    mark_notification_as_read
)
from app.models.notification import NotificationResponse, NotificationCreate

logger = logging.getLogger("api.notifications")

router = APIRouter(tags=["Notifications"])

@router.get("/api/notifications", response_model=List[NotificationResponse])
def get_notifications(user_id: str = Query("user-hod", description="User ID to fetch notifications for")):
    """Fetch notifications for a specific user from the Notification table."""
    return get_user_notifications(user_id)

@router.put("/api/notifications/{notification_id}/read")
def mark_read(notification_id: str):
    """Mark a notification as read."""
    success = mark_notification_as_read(notification_id)
    if not success:
        raise HTTPException(status_code=404, detail=f"Notification {notification_id} not found or failed to update")
    return {"status": "success", "id": notification_id, "is_read": True}

@router.post("/api/notifications", response_model=NotificationResponse)
def post_notification(req: NotificationCreate):
    """Manually create and dispatch a notification."""
    notif = create_notification(
        user_id=req.user_id,
        type=req.type,
        title=req.title,
        message=req.message,
        link=req.link
    )
    return notif

@router.websocket("/ws/notifications/{user_id}")
async def websocket_notifications(websocket: WebSocket, user_id: str):
    """
    Live WebSocket notification channel for a connected user.
    Pushes real-time alerts whenever a notification is triggered.
    """
    await manager.connect(user_id, websocket)
    try:
        # Send initial connection acknowledgment with unread count
        notifications = get_user_notifications(user_id)
        unread_count = sum(1 for n in notifications if not n.get("is_read"))
        await websocket.send_json({
            "event": "connected",
            "user_id": user_id,
            "unread_count": unread_count,
            "message": f"Connected to live notifications for {user_id}"
        })

        # Keep connection open and listen for pings/heartbeats
        while True:
            data = await websocket.receive_text()
            if data == "ping":
                await websocket.send_json({"event": "pong"})
    except WebSocketDisconnect:
        manager.disconnect(user_id, websocket)
    except Exception as e:
        logger.warning(f"WebSocket error for {user_id}: {e}")
        manager.disconnect(user_id, websocket)
