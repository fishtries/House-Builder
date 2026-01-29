/**
 * Форматирование сообщения о заявке для Telegram (как в telegram_bot/bot.py).
 */
export function formatLeadMessage(lead: {
  name: string;
  phone: string;
  email?: string | null;
  source: string;
  created_at?: string;
}): string {
  let created = lead.created_at ?? new Date().toISOString();
  if (created.length > 19) created = created.slice(0, 19).replace("T", " ");
  return (
    "<b>Новая заявка</b>\n\n" +
    `Имя: ${lead.name || "—"}\n` +
    `Телефон: ${lead.phone || "—"}\n` +
    `Email: ${lead.email || "—"}\n` +
    `Источник: ${lead.source || "form"}\n` +
    `Дата: ${created}`
  );
}

/**
 * Отправка сообщения в Telegram (поддержка нескольких chat_id через запятую).
 */
export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIdsRaw = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatIdsRaw) {
    console.error("[Telegram] Не указаны TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID в .env.local");
    return false;
  }
  const chatIds = chatIdsRaw.split(",").map((id) => id.trim()).filter(Boolean);
  if (chatIds.length === 0) {
    console.error("[Telegram] TELEGRAM_CHAT_ID пустой");
    return false;
  }
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  let success = false;
  for (const chatId of chatIds) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      });
      if (res.ok) {
        success = true;
      } else {
        const errText = await res.text().catch(() => "");
        console.error(`[Telegram] Ошибка API для чата ${chatId} (${res.status}):`, errText);
      }
    } catch (err) {
      console.error(`[Telegram] Ошибка отправки в чат ${chatId}:`, err);
    }
  }
  return success;
}
