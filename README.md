This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Заявки с сайта → Telegram

Данные из контактных форм (имя, телефон, email, согласия) сохраняются в `database/leads.json` и **сразу** отправляются в Telegram через API.

1. **Установить зависимости**
   ```bash
   npm install
   ```

2. **Уведомления в Telegram**
   - В корне проекта создайте `.env.local` (скопируйте из `.env.local.example`).
   - Укажите `TELEGRAM_BOT_TOKEN` (от [@BotFather](https://t.me/BotFather)) и `TELEGRAM_CHAT_ID` (чат, куда слать уведомления).
   - При отправке формы API сохраняет заявку и сразу шлёт сообщение в Telegram. Никакого вебхука и опроса БД — всё через API.

3. **Хранение заявок**
   - Заявки сохраняются в файл `database/leads.json`. Файл создаётся при первой отправке.

## Сборка и проверка сайта

1. **Установить зависимости**
   ```bash
   npm install
   ```

2. **Проверить код линтером**
   ```bash
   npm run lint
   ```

3. **Собрать проект (production)**
   ```bash
   npm run build
   ```

4. **Запустить собранный сайт**
   ```bash
   npm start
   ```
   Сайт будет доступен по адресу [http://localhost:3000](http://localhost:3000).

5. **Режим разработки** (для правок с автоперезагрузкой)
   ```bash
   npm run dev
   ```
   В проекте настроен хост `192.168.1.146` — в dev-режиме приложение слушает этот адрес.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
