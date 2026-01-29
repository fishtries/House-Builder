import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

export type ContactBody = {
  name: string;
  phone: string;
  email?: string;
  agreed_newsletter?: boolean;
  agreed_personal_data?: boolean;
};

const MAX_NAME = 100;
const MAX_PHONE = 18;
const MAX_EMAIL = 254;

function validate(body: unknown): { ok: true; data: ContactBody } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid body" };
  }
  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim().slice(0, MAX_NAME) : "";
  const phone = typeof b.phone === "string" ? b.phone.trim().slice(0, MAX_PHONE) : "";
  const email = typeof b.email === "string" ? b.email.trim().slice(0, MAX_EMAIL) : undefined;
  const agreed_newsletter = b.agreed_newsletter === true;
  const agreed_personal_data = b.agreed_personal_data === true;

  if (!name) return { ok: false, error: "Name is required" };
  if (!phone) return { ok: false, error: "Phone is required" };
  if (!agreed_newsletter || !agreed_personal_data) {
    return { ok: false, error: "Consent required" };
  }

  return {
    ok: true,
    data: { name, phone, email: email || undefined, agreed_newsletter, agreed_personal_data },
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = validate(body);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    const { error } = await supabase.from("contacts").insert({
      name: validated.data.name,
      phone: validated.data.phone,
      email: validated.data.email ?? null,
      agreed_newsletter: validated.data.agreed_newsletter,
      agreed_personal_data: validated.data.agreed_personal_data,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save contact" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof Error && e.message.includes("Missing env")) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 503 }
      );
    }
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
