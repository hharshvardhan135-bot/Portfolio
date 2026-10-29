"use client";

import { useEffect, useRef, useState } from "react";

type ContactFormProps = {
  email: string;
};

export default function ContactForm({ email }: ContactFormProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ message: string; kind: "success" | "error" } | null>(null);
  const [requiredError, setRequiredError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  function refreshRequiredError(form: HTMLFormElement | null) {
    if (!form) return;
    const values = new FormData(form);
    const complete = ["name", "email", "purpose"].every((field) =>
      String(values.get(field) ?? "").trim(),
    );
    setRequiredError((current) => current && !complete);
  }

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("contact-drawer-open");
    firstFieldRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        "button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled),[href],[tabindex]:not([tabindex='-1'])",
      ));
      if (!items.length) return;
      if (event.shiftKey && document.activeElement === items[0]) {
        event.preventDefault();
        items[items.length - 1].focus();
      } else if (!event.shiftKey && document.activeElement === items[items.length - 1]) {
        event.preventDefault();
        items[0].focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.documentElement.classList.remove("contact-drawer-open");
      (triggerRef.current ?? previouslyFocused)?.focus();
    };
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const senderEmail = String(form.get("email") ?? "").trim();
    const purpose = String(form.get("purpose") ?? "").trim();
    if (!name || !senderEmail || !purpose) {
      setRequiredError(true);
      setEmailError(false);
      return;
    }
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(senderEmail);
    if (!validEmail) {
      setRequiredError(false);
      setEmailError(true);
      return;
    }
    setRequiredError(false);
    setEmailError(false);
    const formElement = event.currentTarget;
    setSending(true);
    setToast(null);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email.trim()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name,
          email: senderEmail,
          purpose,
          _replyto: senderEmail,
          _subject: `Portfolio contact from ${name}`,
          _template: "table",
          _honey: "",
          _url: window.location.href,
        }),
      });
      const responseBody = await response.text();
      let result: { success?: string | boolean; message?: string } = {};
      try {
        result = JSON.parse(responseBody) as typeof result;
      } catch {
        throw new Error(`Email service returned an unreadable response (HTTP ${response.status}).`);
      }
      const accepted = result.success === true || result.success === "true";
      if (!response.ok || !accepted) {
        throw new Error(result.message || `Email service rejected the message (HTTP ${response.status}).`);
      }
      formElement.reset();
      setOpen(false);
      setToast({ message: "Your message has been sent. Thanks for reaching out!", kind: "success" });
    } catch (error) {
      const message = error instanceof DOMException && error.name === "AbortError"
        ? "Sending timed out. Please check your connection and try again."
        : error instanceof TypeError
          ? "Could not reach the email service. Please check your connection and try again."
          : error instanceof Error
            ? error.message
            : "The message could not be sent. Please try again.";
      setToast({ message, kind: "error" });
    } finally {
      window.clearTimeout(timeout);
      setSending(false);
    }
  }

  return (
    <>
      <button
        className="button button-primary contact-open"
        type="button"
        ref={triggerRef}
        onClick={() => setOpen(true)}
      >
        Start a conversation <span aria-hidden="true">↗</span>
      </button>
      {open && <div className="contact-dialog-overlay" onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}>
      <div className="contact-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="contact-dialog-title" tabIndex={-1}>
        <div className="contact-dialog-head">
          <div>
            <p className="eyebrow">[ START A CONVERSATION ]</p>
            <h2 id="contact-dialog-title">What would you like to discuss?</h2>
          </div>
          <button
            className="contact-dialog-close"
            type="button"
            aria-label="Close contact form"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
        <form className="contact-form" noValidate onSubmit={handleSubmit}>
          <div className="contact-form-fields" data-lenis-prevent>
            <label>
              Your name
              <input ref={firstFieldRef} name="name" autoComplete="name" required maxLength={100} onChange={(event) => {
                refreshRequiredError(event.currentTarget.form);
              }} />
            </label>
            <label>
              Your email
              <input name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={emailError} aria-describedby={emailError ? "contact-email-error" : undefined} onChange={(event) => {
                const value = event.currentTarget.value.trim();
                setEmailError((current) => current && value !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value));
                refreshRequiredError(event.currentTarget.form);
              }} />
              {emailError && <span className="contact-field-error" id="contact-email-error" role="alert">Use a valid email address.</span>}
            </label>
            <label>
              Purpose of reaching out
              <textarea name="purpose" required rows={4} maxLength={2000} onChange={(event) => {
                refreshRequiredError(event.currentTarget.form);
              }} />
            </label>
            {requiredError && <p className="contact-field-error" role="alert">All fields are required.</p>}
            <input className="contact-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          </div>
          <div className="contact-form-footer">
            <p className="contact-form-note">
              Your message will be emailed to {email}. Your email address is checked before sending.
            </p>
            <button className="button button-primary" type="submit" disabled={sending}>
              {sending ? "Sending…" : "Send message"} <span aria-hidden="true">↗</span>
            </button>
          </div>
        </form>
      </div>
      </div>}
      {toast && (
        <div className={`contact-toast contact-toast-${toast.kind}`} role={toast.kind === "error" ? "alert" : "status"}>
          <span aria-hidden="true">{toast.kind === "success" ? "✓" : "!"}</span>
          {toast.message}
          <button type="button" aria-label="Dismiss notification" onClick={() => setToast(null)}>×</button>
        </div>
      )}
    </>
  );
}
