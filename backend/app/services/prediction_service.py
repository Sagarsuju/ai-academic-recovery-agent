from datetime import datetime, timedelta

def predict_completion_date(actual_pct: float, expected_pct: float, target_date_str: str = "December 10, 2026") -> tuple[str, int]:
    gap = expected_pct - actual_pct
    if gap <= 0:
        return target_date_str, -2

    # Estimate ~0.7 days delay per 1% gap
    delay_days = int(gap * 0.7)
    try:
        base_date = datetime.strptime("2026-12-10", "%Y-%m-%d")
        predicted_date = base_date + timedelta(days=delay_days)
        return predicted_date.strftime("%B %d, %Y"), delay_days
    except Exception:
        return "December 22, 2026", 12
