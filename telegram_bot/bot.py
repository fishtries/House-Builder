#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Демон уведомлений Telegram.
Постоянно следит за leads.json и отправляет новые заявки в Telegram.
"""

import json
import os
import sys
import time
import signal
import logging
from datetime import datetime
from pathlib import Path

import requests
from dotenv import load_dotenv

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.FileHandler("telegram_notifier.log", encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ],
)
logger = logging.getLogger(__name__)

load_dotenv()

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
# Поддержка нескольких chat_id через запятую: "123456,789012,-1001234567890"
CHAT_IDS = [cid.strip() for cid in os.getenv("TELEGRAM_CHAT_ID", "").split(",") if cid.strip()]
CHECK_INTERVAL = int(os.getenv("CHECK_INTERVAL_SECONDS", "5"))
RUNNING = True


def get_leads_path() -> Path:
    """Путь к leads.json."""
    script_dir = Path(__file__).resolve().parent
    return script_dir.parent / "database" / "leads.json"


def validate_config():
    """Проверка переменных окружения."""
    errors = []
    if not BOT_TOKEN:
        errors.append("❌ TELEGRAM_BOT_TOKEN не указан в .env")
    elif ":" not in BOT_TOKEN:
        errors.append("❌ TELEGRAM_BOT_TOKEN имеет неверный формат")
    if not CHAT_IDS:
        errors.append("❌ TELEGRAM_CHAT_ID не указан в .env")
    else:
        for cid in CHAT_IDS:
            if not cid.lstrip("-").isdigit():
                errors.append(f"❌ TELEGRAM_CHAT_ID '{cid}' должен быть числом")
    if errors:
        for err in errors:
            logger.error(err)
        sys.exit(1)
    logger.info("✅ Конфигурация валидна")
    logger.info(f"   Chat IDs: {', '.join(CHAT_IDS)}")


def test_telegram_connection() -> bool:
    """Проверка подключения к Telegram."""
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/getMe"
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        bot_info = r.json()
        if bot_info.get("ok"):
            logger.info(f"✅ Подключено к боту: @{bot_info['result']['username']}")
            return True
        logger.error(f"❌ Ошибка Telegram API: {bot_info}")
        return False
    except Exception as e:
        logger.error(f"❌ Не удалось подключиться к Telegram: {e}")
        return False


def send_message(text: str) -> bool:
    """Отправить сообщение во все чаты Telegram."""
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    success = False
    for chat_id in CHAT_IDS:
        payload = {"chat_id": chat_id, "text": text, "parse_mode": "HTML"}
        try:
            r = requests.post(url, json=payload, timeout=15)
            if r.status_code == 200:
                success = True
            else:
                logger.warning(f"❌ Не удалось отправить в чат {chat_id}: {r.status_code}")
        except Exception as e:
            logger.error(f"❌ Ошибка отправки в чат {chat_id}: {e}")
    return success


def format_lead_message(lead: dict) -> str:
    """Форматирование сообщения о заявке."""
    created = lead.get("created_at", "")
    if isinstance(created, str) and len(created) > 19:
        created = created[:19].replace("T", " ")
    return (
        "<b>🔔 Новая заявка</b>\n\n"
        f"<b>👤 Имя:</b> {lead.get('name') or '—'}\n"
        f"<b>📱 Телефон:</b> {lead.get('phone') or '—'}\n"
        f"<b>📧 Email:</b> {lead.get('email') or '—'}\n"
        f"<b>📅 Дата:</b> {created}"
    )


def read_leads(path: Path) -> list[dict]:
    """Читать leads.json."""
    if not path.exists():
        return []
    try:
        data = path.read_text(encoding="utf-8")
        parsed = json.loads(data)
        return parsed if isinstance(parsed, list) else []
    except (json.JSONDecodeError, OSError):
        return []


def write_leads(path: Path, leads: list[dict]):
    """Записать leads.json."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(leads, indent=2, ensure_ascii=False), encoding="utf-8")


def process_leads(path: Path, silent: bool = False) -> tuple[int, int]:
    """Обработать неотправленные заявки. Возвращает (успешно, ошибок).
    
    silent=True — не выводить лог каждой заявки (для отправки накопившихся при старте).
    """
    leads = read_leads(path)
    if not leads:
        return 0, 0

    success, failed = 0, 0
    modified = False

    for lead in leads:
        if lead.get("notified_at"):
            continue  # уже отправлено

        if send_message(format_lead_message(lead)):
            lead["notified_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            success += 1
            modified = True
            if not silent:
                name = lead.get("name", "—")
                phone = lead.get("phone", "—")
                logger.info(f"✅ Заявка отправлена: {name} ({phone})")
        else:
            failed += 1
            if not silent:
                logger.warning(f"❌ Не удалось отправить заявку")

        time.sleep(0.3)

    if modified:
        write_leads(path, leads)

    return success, failed


def shutdown_handler(signum, frame):
    """Обработчик сигнала завершения."""
    global RUNNING
    logger.info("\n⚠️  Завершение работы...")
    RUNNING = False


def main():
    signal.signal(signal.SIGINT, shutdown_handler)
    signal.signal(signal.SIGTERM, shutdown_handler)

    validate_config()

    if not test_telegram_connection():
        sys.exit(1)

    leads_path = get_leads_path()
    logger.info(f"📁 Файл заявок: {leads_path}")

    # Отправить накопившиеся заявки (тихо, без лога каждой)
    pending = sum(1 for lead in read_leads(leads_path) if not lead.get("notified_at"))
    if pending > 0:
        logger.info(f"📬 Найдено {pending} неотправленных заявок, отправляю...")
        sent, failed = process_leads(leads_path, silent=True)
        logger.info(f"✅ Отправлено: {sent}, ошибок: {failed}")
    
    send_message("✅ <b>Бот уведомлений запущен</b>")
    logger.info(f"🚀 Бот запущен. Проверка каждые {CHECK_INTERVAL} сек. Ctrl+C для остановки.\n")

    total_sent = 0
    total_failed = 0

    while RUNNING:
        sent, failed = process_leads(leads_path)
        total_sent += sent
        total_failed += failed

        for _ in range(CHECK_INTERVAL):
            if not RUNNING:
                break
            time.sleep(1)

    send_message(
        "⚠️ <b>Бот уведомлений остановлен</b>\n\n"
        f"Всего отправлено: {total_sent}\n"
        f"Ошибок: {total_failed}"
    )

    logger.info("🛑 Бот остановлен")


if __name__ == "__main__":
    main()
