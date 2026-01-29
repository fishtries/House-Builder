# Telegram-бот: уведомления о заявках

Постоянно работающий бот, который следит за `database/leads.json` и отправляет новые заявки в Telegram.

## Настройка

1. Создайте бота через [@BotFather](https://t.me/BotFather), получите токен.
2. Узнайте ID чата: напишите [@userinfobot](https://t.me/userinfobot) или добавьте бота в группу.
3. Скопируйте `.env.example` в `.env` и заполните:
   ```
   TELEGRAM_BOT_TOKEN=ваш_токен
   TELEGRAM_CHAT_ID=ваш_chat_id
   ```
4. Установите зависимости:
   ```bash
   pip install -r requirements.txt
   ```

## Запуск

```bash
cd telegram_bot
python bot.py
```

Бот будет работать постоянно:
- Каждые 5 секунд проверяет `database/leads.json`
- Находит заявки с `notified_at: null`
- Отправляет их в Telegram
- Обновляет `notified_at` в файле

Для остановки нажмите **Ctrl+C**.

## Как это работает

1. Пользователь отправляет форму на сайте
2. API сохраняет заявку в `database/leads.json` с `notified_at: null`
3. Бот находит эту заявку и отправляет в Telegram
4. Бот ставит `notified_at` — заявка больше не отправляется повторно
