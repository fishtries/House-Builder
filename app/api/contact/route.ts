import { NextResponse } from "next/server";

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

    // At this point data is valid; Supabase integration was removed.
    // You can plug in another storage (DB, email, etc.) here if needed.
    console.log("New contact request:", validated.data);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
