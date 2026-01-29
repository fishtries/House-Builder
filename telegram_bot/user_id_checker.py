#!/usr/bin/env python3
import os
import requests
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

if not TOKEN:
    print("❌ Укажите TELEGRAM_BOT_TOKEN в .env")
    exit(1)

# Получаем обновления
url = f"https://api.telegram.org/bot{TOKEN}/getUpdates"  # ⚠️ без пробелов после 'bot'!
r = requests.get(url)

if not r.ok:
    print(f"❌ Ошибка API: {r.text}")
    exit(1)

data = r.json()
if not data["result"]:
    print("📭 Нет сообщений.")
    print("👉 Напишите боту в Telegram любое сообщение, затем запустите скрипт снова.")
    exit(0)

# Берём последнее сообщение
last = data["result"][-1]["message"]
chat_id = last["chat"]["id"]

print("\n✅ Найден chat_id:")
print(f"   ID: {chat_id}")
print(f"   Тип: {last['chat']['type']}")
print(f"   Имя: {last['chat'].get('first_name', '')} @{last['chat'].get('username', '')}")
print(f"\n📋 Скопируйте в .env:")
print(f"TELEGRAM_CHAT_ID={chat_id}\n")