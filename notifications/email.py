# Email Notification Dispatcher

class EmailNotifier:
    def send_email(self, to_address: str, subject: str, body: str) -> bool:
        print(f"[EMAIL DISPATCH] To: {to_address} | Subject: {subject}")
        return True
