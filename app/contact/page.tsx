"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, Phone, Mail, MapPin, Clock, ChevronDown } from "lucide-react";

const subjects = [
  "Simulation de prêt",
  "Demande en cours",
  "Réclamation",
  "Partenariat",
  "Presse / Médias",
  "Autre",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ subject: "", firstName: "", lastName: "", email: "", phone: "", message: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Requis";
    if (!form.lastName.trim()) e.lastName = "Requis";
    if (!form.email.includes("@")) e.email = "Email invalide";
    if (!form.message.trim() || form.message.length < 10) e.message = "Message trop court";
    if (!form.consent) e.consent = "Consentement requis";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSent(true);
  };

  return (
    <>
      <section style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "4rem 0 3rem", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ color: "white", fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>Contactez-nous</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "500px", margin: "0 auto" }}>
            Notre équipe vous répond dans les <strong style={{ color: "var(--color-accent)" }}>24 heures ouvrées</strong>.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--color-bg)", padding: "3rem 0 5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "3rem", alignItems: "start" }}>

            {/* Form */}
            <div className="card" style={{ padding: "2.5rem" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1.25rem" }}>✅</div>
                  <h2 style={{ marginBottom: "0.75rem" }}>Message envoyé !</h2>
                  <p style={{ color: "var(--color-text-muted)" }}>
                    Nous avons bien reçu votre message. Un conseiller vous répondra dans les 24 heures ouvrées.
                  </p>
                  <button onClick={() => { setSent(false); setForm({ subject: "", firstName: "", lastName: "", email: "", phone: "", message: "", consent: false }); }} className="btn btn-ghost" style={{ marginTop: "1.5rem" }}>
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Formulaire de contact">
                  <h2 style={{ fontFamily: "var(--font-body)", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                    Envoyer un message
                  </h2>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div className="form-group">
                      <label className="form-label form-label-required" htmlFor="subject">Objet</label>
                      <div style={{ position: "relative" }}>
                        <select id="subject" className="form-select" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}>
                          <option value="">Sélectionnez un objet</option>
                          {subjects.map((s) => <option key={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={16} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--color-text-muted)" }} />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="form-group">
                        <label className="form-label form-label-required" htmlFor="cfirstName">Prénom</label>
                        <input id="cfirstName" type="text" className={`form-input ${errors.firstName ? "error" : ""}`} value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} autoComplete="given-name" />
                        {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                      </div>
                      <div className="form-group">
                        <label className="form-label form-label-required" htmlFor="clastName">Nom</label>
                        <input id="clastName" type="text" className={`form-input ${errors.lastName ? "error" : ""}`} value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} autoComplete="family-name" />
                        {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label form-label-required" htmlFor="cemail">Email</label>
                      <input id="cemail" type="email" className={`form-input ${errors.email ? "error" : ""}`} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} autoComplete="email" />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="cphone">Téléphone (optionnel)</label>
                      <input id="cphone" type="tel" className="form-input" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} autoComplete="tel" />
                    </div>

                    <div className="form-group">
                      <label className="form-label form-label-required" htmlFor="cmessage">
                        Message <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>({form.message.length}/500)</span>
                      </label>
                      <textarea
                        id="cmessage"
                        className={`form-textarea ${errors.message ? "error" : ""}`}
                        rows={5}
                        maxLength={500}
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        placeholder="Décrivez votre demande..."
                        style={{ resize: "vertical", minHeight: "120px" }}
                      />
                      {errors.message && <span className="form-error">{errors.message}</span>}
                    </div>

                    <label className="form-check" style={{ padding: "0.875rem 1rem", background: "var(--color-bg-alt)", borderRadius: "var(--radius-md)", border: `1.5px solid ${errors.consent ? "var(--color-danger)" : "var(--color-border)"}`, cursor: "pointer" }}>
                      <input type="checkbox" className="form-check-input" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} />
                      <span className="form-check-label">
                        J&apos;accepte que mes données soient utilisées pour répondre à ma demande de contact, conformément à la{" "}
                        <Link href="/confidentialite" style={{ color: "var(--color-primary-light)" }}>Politique de Confidentialité</Link>. *
                      </span>
                    </label>
                    {errors.consent && <span className="form-error">{errors.consent}</span>}

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center" }}>
                      <Send size={18} />
                      Envoyer mon message
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { icon: Phone, title: "Téléphone", content: "01 00 00 00 00", sub: "Non surtaxé — appel gratuit", href: "tel:+33100000000", color: "var(--color-primary)" },
                { icon: Mail, title: "Email", content: "contact@financepro.fr", sub: "Réponse sous 24h ouvrées", href: "mailto:contact@financepro.fr", color: "var(--color-accent)" },
                { icon: MapPin, title: "Adresse", content: "1 rue de la Finance", sub: "75001 Paris (siège social)", href: null, color: "#8B5CF6" },
                { icon: Clock, title: "Horaires", content: "Lun–Ven : 9h–18h", sub: "Samedi : 9h–12h", href: null, color: "var(--color-gold)" },
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
                  🚀 Besoin d&apos;une réponse rapide ?
                </h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", lineHeight: "1.6", marginBottom: "1rem" }}>
                  Utilisez notre simulateur pour obtenir une estimation immédiate et commencer votre demande.
                </p>
                <Link href="/simulateur" className="btn btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                  Simuler maintenant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
