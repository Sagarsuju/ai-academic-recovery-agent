# In-App Alert Dispatcher

class AlertDispatcher:
    def trigger_alert(self, severity: str, title: str, details: str) -> dict:
        return {
            "severity": severity,
            "title": title,
            "details": details,
            "status": "DISPATCHED"
        }
