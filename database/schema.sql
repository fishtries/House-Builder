-- Таблица заявок/лидов с сайта (контактные формы)
-- Совместимо с SQLite и PostgreSQL

CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(18) NOT NULL,
    email VARCHAR(254),
    agreed_newsletter BOOLEAN NOT NULL DEFAULT 0,
    agreed_personal_data BOOLEAN NOT NULL DEFAULT 0,
    source VARCHAR(50) NOT NULL DEFAULT 'form',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    notified_at TIMESTAMP,
    notes TEXT
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);

-- Пример вставки:
-- INSERT INTO leads (name, phone, email, agreed_newsletter, agreed_personal_data, source)
-- VALUES ('Иван', '+7 (999) 123-45-67', 'ivan@mail.ru', 1, 1, 'dialog');

-- Пример выборки последних заявок:
-- SELECT id, name, phone, email, source, created_at FROM leads ORDER BY created_at DESC LIMIT 50;
