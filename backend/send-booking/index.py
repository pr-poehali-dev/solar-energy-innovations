import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки на бронирование дома на почту владельца."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Неверный формат данных"}, ensure_ascii=False)}

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    email = body.get("email", "").strip()
    dates = body.get("dates", "").strip()
    guests = body.get("guests", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Укажите имя и телефон"}, ensure_ascii=False),
        }

    contact_email = os.environ.get("CONTACT_EMAIL", "")
    smtp_key = os.environ.get("SMTP_KEY", "")

    if not contact_email or not smtp_key:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": "Почта получателя не настроена"}, ensure_ascii=False),
        }

    html_body = f"""
    <h2 style="color:#333;">Новая заявка на бронирование</h2>
    <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;">
      <tr><td style="padding:8px;font-weight:bold;width:140px;">Имя</td><td style="padding:8px;">{name}</td></tr>
      <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Телефон</td><td style="padding:8px;">{phone}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">{email or '—'}</td></tr>
      <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Даты</td><td style="padding:8px;">{dates or '—'}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Гостей</td><td style="padding:8px;">{guests or '—'}</td></tr>
      <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Сообщение</td><td style="padding:8px;">{message or '—'}</td></tr>
    </table>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Заявка на бронирование от {name}"
    msg["From"] = "noreply@poehali.dev"
    msg["To"] = contact_email
    msg.attach(MIMEText(html_body, "html"))

    try:
        with smtplib.SMTP("smtp-relay.brevo.com", 587) as server:
            server.starttls()
            server.login("noreply@poehali.dev", smtp_key)
            server.sendmail("noreply@poehali.dev", contact_email, msg.as_string())
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": f"Ошибка отправки: {str(e)}"}, ensure_ascii=False),
        }

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"ok": True, "message": "Заявка отправлена"}, ensure_ascii=False),
    }