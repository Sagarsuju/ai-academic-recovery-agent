# Push Notification Service

class PushNotifier:
    def send_push_notification(self, user_id: str, title: str, message: str) -> bool:
        print(f"[PUSH DISPATCH] User: {user_id} | Title: {title}")
        return True
