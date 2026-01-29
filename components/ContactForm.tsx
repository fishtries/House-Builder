"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/Container";

// Лимиты длины и валидация (как в ContactDialog)
const MAX_NAME_LENGTH = 100;
const MAX_PHONE_LENGTH = 18;
const MAX_EMAIL_LENGTH = 254;
const EMAIL_ALLOWED_REGEX = /^[a-zA-Z0-9@._+-]*$/;
const EMAIL_VALID_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

function formatPhoneDisplay(raw: string): string {
  const d = digitsOnly(raw);
  if (d.length === 0) return "";
  let num = d.startsWith("8") ? "7" + d.slice(1) : d.startsWith("7") ? d : "7" + d;
  num = num.slice(0, 11);
  const main = num.slice(1);
  const p1 = main.slice(0, 3);
  const p2 = main.slice(3, 6);
  const p3 = main.slice(6, 8);
  const p4 = main.slice(8, 10);
  let out = "+7";
  if (p1) out += " (" + p1;
  if (p2) out += ") " + p2;
  if (p3) out += "-" + p3;
  if (p4) out += "-" + p4;
  return out;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const d = raw.replace(/\D/g, "");
    if (d.length > 11) return;
    const formatted = formatPhoneDisplay(raw);
    if (formatted.length <= MAX_PHONE_LENGTH) {
      setPhone(formatted);
      setPhoneError("");
    }
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, MAX_EMAIL_LENGTH);
    if (value === "" || EMAIL_ALLOWED_REGEX.test(value)) {
      setEmail(value);
      setEmailError("");
    }
  }, []);

  const validatePhone = useCallback((value: string): boolean => {
    const d = digitsOnly(value);
    const normalized = d.startsWith("8") ? "7" + d.slice(1) : d.startsWith("7") ? d : "7" + d;
    return normalized.length >= 11;
  }, []);

  const validateEmail = useCallback((value: string): boolean => {
    if (!value.trim()) return true;
    return EMAIL_VALID_REGEX.test(value.trim()) && value.length <= MAX_EMAIL_LENGTH;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim().slice(0, MAX_NAME_LENGTH);
    const trimmedEmail = email.trim().slice(0, MAX_EMAIL_LENGTH);
    setPhoneError("");
    setEmailError("");
    setSubmitError("");

    if (!validatePhone(phone)) {
      setPhoneError("Введите корректный номер: 11 цифр (например, +7 999 123-45-67)");
      return;
    }
    if (trimmedEmail && !validateEmail(trimmedEmail)) {
      setEmailError("Введите корректный адрес электронной почты");
      return;
    }

    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          phone,
          email: trimmedEmail || undefined,
          agreed_newsletter: agreed1,
          agreed_personal_data: agreed2,
          source: "form",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitStatus("error");
        setSubmitError(data.error || "Ошибка отправки. Попробуйте позже.");
        return;
      }
      setSubmitStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setAgreed1(false);
      setAgreed2(false);
    } catch {
      setSubmitStatus("error");
      setSubmitError("Ошибка отправки. Проверьте интернет и попробуйте снова.");
    }
  };

  return (
    <section className="w-full py-16 bg-white">
      <Container className="container px-4 md:px-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Ждем вас в офисе</CardTitle>
            <CardDescription className="text-center">
              г. Краснодар ул. Красных Партизан, 117, 3й этаж, офис №313
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LENGTH))}
                  required
                  maxLength={MAX_NAME_LENGTH}
                  placeholder="Введите ваше имя"
                  autoComplete="name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Ваш телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  maxLength={MAX_PHONE_LENGTH}
                  placeholder="+7 (___) ___-__-__"
                  autoComplete="tel"
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? "phone-error" : undefined}
                />
                {phoneError && (
                  <p id="phone-error" className="text-sm text-destructive">
                    {phoneError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (необязательно)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  maxLength={MAX_EMAIL_LENGTH}
                  placeholder="example@mail.ru"
                  autoComplete="email"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
                {emailError && (
                  <p id="email-error" className="text-sm text-destructive">
                    {emailError}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreement1"
                    checked={agreed1}
                    onCheckedChange={(checked) => setAgreed1(checked as boolean)}
                  />
                  <Label htmlFor="agreement1" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Нажимая кнопку "Отправить", я соглашаюсь на получение рассылки в соотв. с ФЗ от 13.03.2006 Nº38-Ф3 на условиях и для целей, определенных{" "}
                    <a href="#" className="text-primary underline">Политикой конфиденциальности</a>
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreement2"
                    checked={agreed2}
                    onCheckedChange={(checked) => setAgreed2(checked as boolean)}
                  />
                  <Label htmlFor="agreement2" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Нажимая кнопку "Отправить", я соглашаюсь на обработку моих персональных данных в соотв. с ФЗ от 27.07.2006 Nº152-Ф3 на условиях и для целей, определенных{" "}
                    <a href="#" className="text-primary underline">Согласием на обработку персональных данных</a>
                  </Label>
                </div>
              </div>

              {submitStatus === "success" && (
                <p className="text-sm text-green-600">
                  Спасибо! Заявка отправлена, мы свяжемся с вами.
                </p>
              )}
              {submitStatus === "error" && submitError && (
                <p className="text-sm text-destructive">{submitError}</p>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={!agreed1 || !agreed2 || submitStatus === "loading"}
              >
                {submitStatus === "loading" ? "Отправка…" : "Отправить"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
