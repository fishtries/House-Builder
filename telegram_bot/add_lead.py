#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Вставить тестовую заявку в БД (для проверки бота)."""

import os
import sys

# Добавляем родительскую папку в path, чтобы импортировать bot
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from bot import get_db_connection, init_db

def main():
    conn = get_db_connection()
    init_db(conn)
    conn.execute(
        "INSERT INTO leads (name, phone, email, agreed_newsletter, agreed_personal_data, source) VALUES (?, ?, ?, ?, ?, ?)",
        ("Тестовый Клиент", "+7 (999) 123-45-67", "test@example.com", 1, 1, "form"),
    )
    conn.commit()
    print("Заявка добавлена. Запустите: python bot.py")
    conn.close()

if __name__ == "__main__":
    main()
