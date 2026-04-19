"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, Phone, Mail, MapPin, Clock, ChevronDown, Loader2 } from "lucide-react";
import { useDictionary } from "@/components/DictionaryProvider";
import { getLocalizedPath, type AppLocale } from "@/lib/routes";
import { submitContactForm } from "@/app/contact/actions";

export default function ContactPage() {
  const { dict, lang } = useDictionary();
  const locale = lang as AppLocale;
  const t = dict?.contact || {};
  const subjects = t.subjects ? Object.values(t.subjects) as string[] : [
    "Simulación de préstamo",
    "Solicitud en curso",
    "Reclamación",
    "Asociación",
    "Prensa / Medios",
    "Otro",
  ];

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [form, setForm] = useState({ subject: "", firstName: "", lastName: "", email: "", phone: "", message: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = t.required || "Requerido";
    if (!form.lastName.trim()) e.lastName = t.required || "Requerido";
    if (!form.email.includes("@")) e.email = t.email_invalid || "Correo inválido";
    if (!form.message.trim() || form.message.length < 10) e.message = t.message_short || "Mensaje demasiado corto";
    if (!form.consent) e.consent = t.consent_required || "Consentimiento requerido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const result = await submitContactForm({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone || undefined,
        subject: form.subject || undefined,
        message: form.message,
      });
      if (result.success) {
        setSent(true);
      } else {
        setServerError(result.error || "Une erreur est survenue.");
      }
    } catch {
      setServerError("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "4rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>{t.title || "Contáctenos"}</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "500px", margin: "0 auto" }}>
            {t.subtitle_1 || "Nuestro equipo le responde en las "}<strong style={{ color: "var(--color-accent)" }}>{t.subtitle_highlight || "24 horas laborables"}</strong>.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]" style={{gap: "3rem", alignItems: "start"}}>

            {/* Form */}
            <div className="card" style={{ padding: "2.5rem" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1.25rem" }}>✅</div>
                  <h2 style={{ marginBottom: "0.75rem" }}>{t.success_title || "¡Mensaje enviado!"}</h2>
                  <p style={{ color: "var(--color-text-muted)" }}>
                    {t.success_desc || "Hemos recibido su mensaje. Un asesor le responderá en las 24 horas laborables."}
                  </p>
                  <button onClick={() => { setSent(false); setForm({ subject: "", firstName: "", lastName: "", email: "", phone: "", message: "", consent: false }); }} className="btn btn-ghost" style={{ marginTop: "1.5rem" }}>
                    {t.send_another || "Enviar otro mensaje"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label={t.form_title || "Formulario de contacto"}>
                  <h2 style={{ fontFamily: "var(--font-body)", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                    {t.form_title || "Enviar un mensaje"}
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div className="form-group">
                      <label className="form-label form-label-required" htmlFor="subject">{t.subject_label || "Asunto"}</label>
                      <div style={{ position: "relative" }}>
                        <select id="subject" className="form-select" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}>
                          <option value="">{t.subject_placeholder || "Seleccione un asunto"}</option>
                          {subjects.map((s) => <option key={String(s)}>{String(s)}</option>)}
                        </select>
                        <ChevronDown size={16} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--color-text-muted)" }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2" style={{gap: "1rem"}}>
                      <div className="form-group">
                        <label className="form-label form-label-required" htmlFor="cfirstName">{t.first_name || "Nombre"}</label>
                        <input id="cfirstName" type="text" className={`form-input ${errors.firstName ? "error" : ""}`} value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} autoComplete="given-name" />
                        {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                      </div>
                      <div className="form-group">
                        <label className="form-label form-label-required" htmlFor="clastName">{t.last_name || "Apellido"}</label>
                        <input id="clastName" type="text" className={`form-input ${errors.lastName ? "error" : ""}`} value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} autoComplete="family-name" />
                        {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label form-label-required" htmlFor="cemail">{t.email || "Correo electrónico"}</label>
                      <input id="cemail" type="email" className={`form-input ${errors.email ? "error" : ""}`} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} autoComplete="email" />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="cphone">{t.phone || "Teléfono (opcional)"}</label>
                      <input id="cphone" type="tel" className="form-input" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} autoComplete="tel" />
                    </div>

                    <div className="form-group">
                      <label className="form-label form-label-required" htmlFor="cmessage">
                        {t.message_label || "Mensaje"} <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>({form.message.length}/500)</span>
                      </label>
                      <textarea
                        id="cmessage"
                        className={`form-textarea ${errors.message ? "error" : ""}`}
                        rows={5}
                        maxLength={500}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder={t.message_placeholder || "Describa su solicitud..."}
                        style={{ resize: "vertical", minHeight: "120px" }}
                      />
                      {errors.message && <span className="form-error">{errors.message}</span>}
                    </div>

                    <label className="form-check" style={{ padding: "0.875rem 1rem", background: "var(--color-bg-alt)", borderRadius: "var(--radius-md)", border: `1.5px solid ${errors.consent ? "var(--color-danger)" : "var(--color-border)"}`, cursor: "pointer" }}>
                      <input type="checkbox" className="form-check-input" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} />
                      <span className="form-check-label">
                        {t.consent || "Acepto que mis datos se utilicen para responder a mi solicitud de contacto, conforme a la "}{" "}
                        <Link href={getLocalizedPath("privacy", locale)} style={{ color: "var(--color-primary-light)" }}>{t.consent_link || "Política de Privacidad"}</Link>. *
                      </span>
                    </label>
                    {errors.consent && <span className="form-error">{errors.consent}</span>}

                    {serverError && (
                      <div style={{ padding: "12px 16px", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: "var(--radius-md)", color: "#DC2626", fontSize: "0.875rem" }}>
                        {serverError}
                      </div>
                    )}

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center" }} disabled={loading}>
                      {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={18} />}
                      {loading ? (t.sending || "Envío en curso...") : (t.submit_btn || "Enviar mi mensaje")}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { icon: Phone, title: lang === "fr" ? "Téléphone" : "Teléfono", content: t.info_phone || "+34 900 000 000", sub: t.info_phone_sub || "Llamada gratuita", href: "tel:+34900000000", color: "var(--color-primary)" },
                { icon: Mail, title: "Email", content: t.info_email || "contacto@financepro.es", sub: t.info_email_sub || "Respuesta en 24h laborables", href: `mailto:${t.info_email || "contacto@financepro.es"}`, color: "var(--color-accent)" },
                { icon: MapPin, title: lang === "fr" ? "Adresse" : "Dirección", content: t.info_address || "Calle Gran Vía 42", sub: t.info_address_sub || "28013 Madrid (sede social)", href: null, color: "#8B5CF6" },
                { icon: Clock, title: lang === "fr" ? "Horaires" : "Horario", content: t.info_hours || "Lun-Vie: 9h-18h", sub: t.info_hours_sub || "Sábado: 9h-12h", href: null, color: "var(--color-gold)" },
              ].map(({ icon: Icon, title, content, sub, href, color }) => (
                <div key={title} className="card" style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "var(--radius-md)", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={22} style={{ color }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: "700", fontSize: "0.9rem", marginBottom: "0.2rem" }}>{title}</p>
                      {href ? (
                        <a href={href} style={{ color: color, fontWeight: "600", fontSize: "0.95rem" }}>{content}</a>
                      ) : (
                        <p style={{ color: "var(--color-text)", fontWeight: "600", fontSize: "0.95rem" }}>{content}</p>
                      )}
                      <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{sub}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="card" style={{ padding: "1.5rem", background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", border: "none" }}>
                <h3 style={{ color: "white", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: "700", marginBottom: "0.75rem" }}>
                  {t.quick_title || "🚀 ¿Necesita una respuesta rápida?"}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", lineHeight: "1.6", marginBottom: "1rem" }}>
                  {t.quick_desc || "Utilice nuestro simulador para obtener una estimación inmediata y comenzar su solicitud."}
                </p>
                <Link href={getLocalizedPath("simulator", locale)} className="btn btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                  {t.quick_btn || "Simular ahora"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
