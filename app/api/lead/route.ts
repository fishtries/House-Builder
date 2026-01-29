import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { formatLeadMessage, sendTelegramMessage } from "@/lib/lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DB_DIR = path.join(process.cwd(), "database");
const LEADS_FILE = path.join(DB_DIR, "leads.json");

type LeadRow = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  agreed_newsletter: number;
  agreed_personal_data: number;
  source: string;
  created_at: string;
  notified_at: string | null;
};

type LeadBody = {
  name: string;
  phone: string;
  email?: string;
  agreed_newsletter?: boolean;
  agreed_personal_data?: boolean;
  source?: string;
};

function readLeads(): LeadRow[] {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    const parsed = JSON.parse(data) as unknown;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLeads(leads: LeadRow[]): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export async function POST(request: NextRequest) {
  let body: LeadBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Неверный JSON в теле запроса" },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 18) : "";
  const email =
    typeof body.email === "string" && body.email.trim()
      ? body.email.trim().slice(0, 254)
      : null;
  const agreed_newsletter = Boolean(body.agreed_newsletter);
  const agreed_personal_data = Boolean(body.agreed_personal_data);
  const source =
    typeof body.source === "string" && body.source.trim()
      ? body.source.trim().slice(0, 50)
      : "form";

  if (!name || !phone) {
    return NextResponse.json(
      { error: "Укажите имя и телефон" },
      { status: 400 }
    );
  }

  try {
    const leads = readLeads();
    const nextId = leads.length > 0 ? Math.max(...leads.map((l) => l.id)) + 1 : 1;
    const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");

    const lead: LeadRow = {
      id: nextId,
      name,
      phone,
      email,
      agreed_newsletter: agreed_newsletter ? 1 : 0,
      agreed_personal_data: agreed_personal_data ? 1 : 0,
      source,
      created_at,
      notified_at: null,
    };

    const message = formatLeadMessage({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      source: lead.source,
      created_at: lead.created_at,
    });
    const sent = await sendTelegramMessage(message);
    if (sent) {
      lead.notified_at = created_at;
    }

    leads.push(lead);
    writeLeads(leads);

    return NextResponse.json({ success: true, id: lead.id });
  } catch (e) {
    console.error("Lead save error:", e);
    return NextResponse.json(
      { error: "Ошибка сохранения заявки" },
      { status: 500 }
    );
  }
}
