import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-bg)",
        padding: "2rem 0",
      }}
    >
      <div className="container" style={{ maxWidth: "600px", textAlign: "center" }}>
        {/* Big 404 */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(6rem, 15vw, 10rem)",
            fontWeight: "800",
            lineHeight: "1",
            background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1.5rem",
            userSelect: "none",
          }}
          aria-hidden="true"
        >
          404
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            marginBottom: "1rem",
            color: "var(--color-text)",
          }}
        >
          Page introuvable
        </h1>

        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "1.05rem",
            lineHeight: "1.7",
            marginBottom: "2.5rem",
            maxWidth: "450px",
            margin: "0 auto 2.5rem",
          }}
        >
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
          Pas d&apos;inquiétude, votre projet de financement est toujours entre de bonnes mains.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" className="btn btn-primary">
            <Home size={18} />
            Retour à l&apos;accueil
          </Link>
          <Link href="/simulateur" className="btn btn-secondary">
            <Search size={18} />
            Simuler un prêt
          </Link>
        </div>

        {/* Quick links */}
        <div
          style={{
            marginTop: "3rem",
            padding: "1.5rem",
            background: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "var(--color-text)",
            }}
          >
            Pages populaires
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              justifyContent: "center",
            }}
          >
            {[
              { label: "Offres", href: "/offres" },
              { label: "Simulateur", href: "/simulateur" },
              { label: "Faire une demande", href: "/demande" },
              { label: "Contact", href: "/contact" },
              { label: "FAQ", href: "/faq" },
              { label: "Comment ça marche", href: "/comment-ca-marche" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--color-border)",
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
