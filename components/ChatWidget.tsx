"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Clock } from "lucide-react";

const faqAnswers: Record<string, string> = {
  "Quels délais ?": "Réponse de principe sous 24h en jours ouvrés. Versement des fonds sous 48h après accord complet et signature.",
  "Simulation ?": "La simulation est 100% gratuite, sans engagement et sans impact sur votre dossier bancaire.",
  "Quels documents ?": "Pièce d'identité, 3 derniers bulletins de salaire (ou bilans), 3 derniers relevés bancaires, justificatif de domicile et RIB.",
  "Taux ?": "Nos TAEG débutent à partir de 2,1%. Le taux définitif dépend de votre profil, du montant et de la durée.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour ! Je suis l'assistant FinancePro. Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");

  const isAvailable = () => {
    const h = new Date().getHours();
    const d = new Date().getDay();
    return d >= 1 && d <= 5 && h >= 9 && h < 18;
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { from: "user", text: userMsg }]);

    setTimeout(() => {
      const match = Object.keys(faqAnswers).find((k) =>
        userMsg.toLowerCase().includes(k.toLowerCase().slice(0, 5))
      );
      const reply = match
        ? faqAnswers[match]
        : "Je transmets votre question à un conseiller qui vous répondra dans les meilleurs délais. Vous pouvez aussi nous appeler au 01 00 00 00 00.";
      setMessages((m) => [...m, { from: "bot", text: reply }]);
    }, 800);
  };

  return (
    <div className="chat-widget">
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 1rem)",
            right: 0,
            width: "320px",
            background: "white",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-xl)",
            border: "1px solid var(--color-border)",
            overflow: "hidden",
            animation: "scaleIn 0.2s ease-out",
            transformOrigin: "bottom right",
          }}
          role="dialog"
          aria-label="Chat avec un conseiller FinancePro"
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
              padding: "1rem 1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageCircle size={18} color="white" />
              </div>
              <div>
                <p style={{ color: "white", fontWeight: "700", fontSize: "0.9rem" }}>FinancePro Chat</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  <div
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: isAvailable() ? "var(--color-accent)" : "#9CA3AF",
                    }}
                  />
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>
                    {isAvailable() ? "En ligne" : "Hors ligne"}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer le chat"
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer" }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Hours */}
          {!isAvailable() && (
            <div
              style={{
                padding: "0.625rem 1rem",
                background: "rgba(245,158,11,0.08)",
                borderBottom: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.775rem",
                color: "#92400E",
              }}
            >
              <Clock size={13} />
              Conseillers disponibles Lun-Ven 9h-18h, Sam 9h-12h
            </div>
          )}

          {/* Quick Questions */}
          <div style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border-light)" }}>
            <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
              Questions fréquentes :
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
              {Object.keys(faqAnswers).map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setMessages((m) => [
                      ...m,
                      { from: "user", text: q },
                      { from: "bot", text: faqAnswers[q] },
                    ]);
                  }}
                  style={{
                    background: "var(--color-bg-alt)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-full)",
                    padding: "0.3rem 0.75rem",
                    fontSize: "0.775rem",
                    cursor: "pointer",
                    color: "var(--color-text)",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--color-primary)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--color-bg-alt)";
                    e.currentTarget.style.color = "var(--color-text)";
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              height: "200px",
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
            aria-live="polite"
            aria-label="Messages du chat"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "0.625rem 0.875rem",
                    borderRadius:
                      msg.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    background: msg.from === "user" ? "var(--color-primary)" : "var(--color-bg-alt)",
                    color: msg.from === "user" ? "white" : "var(--color-text)",
                    fontSize: "0.85rem",
                    lineHeight: "1.5",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              padding: "0.75rem",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Écrivez votre message..."
              aria-label="Message à envoyer"
              style={{
                flex: 1,
                padding: "0.625rem 0.875rem",
                border: "1.5px solid var(--color-border)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.875rem",
                fontFamily: "var(--font-body)",
                outline: "none",
                color: "var(--color-text)",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              aria-label="Envoyer le message"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: input.trim() ? "var(--color-accent)" : "var(--color-border)",
                border: "none",
                cursor: input.trim() ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              <Send size={16} color="white" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="chat-button"
        aria-expanded={open}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat avec un conseiller"}
        title="Parler à un conseiller"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
