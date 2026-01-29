"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Лимиты длины (защита от переполнения и DoS)
const MAX_NAME_LENGTH = 100;
const MAX_PHONE_LENGTH = 18; // +7 (999) 999-99-99
const MAX_EMAIL_LENGTH = 254; // RFC 5321

// Валидные символы для email (RFC 5322 упрощённо: буквы, цифры, @._-)
const EMAIL_ALLOWED_REGEX = /^[a-zA-Z0-9@._+-]*$/;

// Валидация email по стандарту (упрощённый RFC 5322)
const EMAIL_VALID_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  /** Источник заявки для БД и Telegram (hero, mortgage, gallery, howwebuild и т.д.) */
  source?: string;
  onSubmit?: (data: { name: string; phone: string; email: string }) => void;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

// Форматирование телефона: +7 (XXX) XXX-XX-XX
function formatPhoneDisplay(raw: string): string {
  const d = digitsOnly(raw);
  if (d.length === 0) return "";
  let num = d.startsWith("8") ? "7" + d.slice(1) : d.startsWith("7") ? d : "7" + d;
  num = num.slice(0, 11); // макс 11 цифр (7 + 10)
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

export default function ContactDialog({
  open,
  onOpenChange,
  title = "Рассчитать бюджет строительства",
  description = "Укажите свои данные и мы свяжемся с вами в рабочее время для обсуждения деталей",
  source = "dialog",
  onSubmit,
}: ContactDialogProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
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

  const validateEmail = useCallback((value: string): boolean => {
    if (!value.trim()) return true;
    const ok = EMAIL_VALID_REGEX.test(value.trim()) && value.length <= MAX_EMAIL_LENGTH;
    return ok;
  }, []);

  const validatePhone = useCallback((value: string): boolean => {
    const d = digitsOnly(value);
    const normalized = d.startsWith("8") ? "7" + d.slice(1) : d.startsWith("7") ? d : "7" + d;
    return normalized.length >= 11; // 7 + 10 цифр
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

    setSubmitLoading(true);
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
          source,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(data.error || "Ошибка отправки. Попробуйте позже.");
        setSubmitLoading(false);
        return;
      }
      onSubmit?.({ name: trimmedName, phone, email: trimmedEmail });
      onOpenChange(false);
      setName("");
      setPhone("");
      setEmail("");
      setAgreed1(false);
      setAgreed2(false);
      setEmailError("");
      setPhoneError("");
    } catch {
      setSubmitError("Ошибка отправки. Проверьте интернет и попробуйте снова.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Ваше имя</Label>
            <Input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, MAX_NAME_LENGTH))}
              required
              maxLength={MAX_NAME_LENGTH}
              placeholder="Введите ваше имя"
              autoComplete="name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-phone">Ваш телефон</Label>
            <Input
              id="contact-phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              required
              maxLength={MAX_PHONE_LENGTH}
              placeholder="+7 (___) ___-__-__"
              autoComplete="tel"
              aria-invalid={!!phoneError}
              aria-describedby={phoneError ? "contact-phone-error" : undefined}
            />
            {phoneError && (
              <p id="contact-phone-error" className="text-sm text-destructive">
                {phoneError}
              </p>
            )}
            {submitError && (
              <p className="text-sm text-destructive">{submitError}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email (необязательно)</Label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              maxLength={MAX_EMAIL_LENGTH}
              placeholder="example@mail.ru"
              autoComplete="email"
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "contact-email-error" : undefined}
            />
            {emailError && (
              <p id="contact-email-error" className="text-sm text-destructive">
                {emailError}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="contact-agreement1"
                checked={agreed1}
                onCheckedChange={(checked) => setAgreed1(checked as boolean)}
              />
              <Label 
                htmlFor="contact-agreement1" 
                className="text-xs leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Нажимая кнопку "Отправить", я соглашаюсь на получение рассылки в соотв. с ФЗ от 13.03.2006 Nº38-Ф3 на условиях и для целей, определенных{" "}
                <a href="#" className="text-primary underline">Политикой конфиденциальности</a>
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="contact-agreement2"
                checked={agreed2}
                onCheckedChange={(checked) => setAgreed2(checked as boolean)}
              />
              <Label 
                htmlFor="contact-agreement2" 
                className="text-xs leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Нажимая кнопку "Отправить", я соглашаюсь на обработку моих персональных данных в соотв. с ФЗ от 27.07.2006 Nº152-Ф3 на условиях и для целей, определенных{" "}
                <a href="#" className="text-primary underline">Согласием на обработку персональных данных</a>
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!agreed1 || !agreed2 || submitLoading}
          >
            {submitLoading ? "Отправка…" : "Отправить"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
