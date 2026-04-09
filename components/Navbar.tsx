"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  TrendingUp,
  Menu,
  X,
  ChevronDown,
  Home,
  Calculator,
  FileText,
  User,
  Info,
  HelpCircle,
  Phone,
} from "lucide-react";

const offresMenu = [
  { label: "Prêt Personnel", href: "/offres/personnel", desc: "Financement sans justificatif" },
  { label: "Prêt Immobilier", href: "/offres/immobilier", desc: "Acquisition & investissement" },
  { label: "Prêt Professionnel", href: "/offres/professionnel", desc: "TPE, PME, indépendants" },
  { label: "Rachat de Crédit", href: "/offres/rachat", desc: "Regroupez vos crédits" },
  { label: "Prêt Travaux", href: "/offres/travaux", desc: "Rénovation & éco-travaux" },
  { label: "Prêt Auto", href: "/offres/auto", desc: "Neuf, occasion & LOA" },
];

const navItems = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Simulateur", href: "/simulateur", icon: Calculator },
  { label: "Nos Offres", href: "/offres", icon: FileText, hasDropdown: true },
  { label: "Comment ça marche", href: "/comment-ca-marche", icon: Info },
  { label: "Blog", href: "/blog", icon: FileText },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
  { label: "Contact", href: "/contact", icon: Phone },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [offresOpen, setOffresOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    checkAuth();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOffresOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOffresOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isTransparent = isHomePage && !scrolled;

  return (
    <header
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      style={{
        background: isTransparent
          ? "transparent"
          : scrolled
          ? "rgba(255,255,255,0.97)"
          : "transparent",
      }}
    >
      <nav
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem var(--container-padding)",
        }}
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="FinancePro — Retour à l'accueil"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <TrendingUp size={20} color="white" strokeWidth={2.5} />
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              fontWeight: "800",
              color: isTransparent ? "white" : "var(--color-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Finance<span style={{ color: "var(--color-accent)" }}>Pro</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div
          className="hide-mobile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          {navItems.map((item) => {
            if (item.hasDropdown) {
              return (
                <div key={item.href} style={{ position: "relative" }} ref={dropdownRef}>
                  <button
                    onClick={() => setOffresOpen(!offresOpen)}
                    aria-expanded={offresOpen}
                    aria-haspopup="true"
                    className={`nav-link ${isTransparent ? "nav-link-white" : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      style={{
                        transition: "transform 0.2s",
                        transform: offresOpen ? "rotate(180deg)" : "none",
                      }}
                    />
                  </button>

                  {offresOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 0.75rem)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "white",
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-xl)",
                        border: "1px solid var(--color-border)",
                        padding: "0.75rem",
                        width: "320px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.375rem",
                        animation: "scaleIn 0.2s ease-out",
                        zIndex: 1001,
                      }}
                      role="menu"
                    >
                      {offresMenu.map((o) => (
                        <Link
                          key={o.href}
                          href={o.href}
                          role="menuitem"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.15rem",
                            padding: "0.75rem",
                            borderRadius: "var(--radius-md)",
                            textDecoration: "none",
                            transition: "background var(--transition-fast)",
                            background: pathname === o.href ? "rgba(0,200,150,0.08)" : "transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--color-bg-alt)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background =
                              pathname === o.href ? "rgba(0,200,150,0.08)" : "transparent";
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: "600",
                              color: "var(--color-text)",
                            }}
                          >
                            {o.label}
                          </span>
                          <span style={{ fontSize: "0.775rem", color: "var(--color-text-muted)" }}>
                            {o.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isTransparent ? "nav-link-white" : ""} ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* CTA + Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {user ? (
            <Link
              href="/espace-client"
              className="hide-mobile btn btn-ghost btn-sm"
              style={
                isTransparent
                  ? {
                      color: "rgba(255,255,255,0.8)",
                      borderColor: "rgba(255,255,255,0.3)",
                    }
                  : {}
              }
            >
              <User size={15} />
              Mon espace
            </Link>
          ) : (
            <Link
              href="/connexion"
              className="hide-mobile btn btn-ghost btn-sm"
              style={
                isTransparent
                  ? {
                      color: "rgba(255,255,255,0.8)",
                      borderColor: "rgba(255,255,255,0.3)",
                    }
                  : {}
              }
            >
              <User size={15} />
              Connexion
            </Link>
          )}
          <Link href="/demande" className="btn btn-primary btn-sm">
            Faire une demande
          </Link>

          {/* Mobile hamburger */}
          <button
            className="hide-desktop"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              color: isTransparent ? "white" : "var(--color-text)",
            }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            background: "white",
            borderTop: "1px solid var(--color-border)",
            padding: "1.25rem var(--container-padding) 2rem",
            animation: "fadeInDown 0.2s ease-out",
          }}
          role="navigation"
          aria-label="Menu mobile"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {navItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div key={item.href}>
                    <button
                      onClick={() => setOffresOpen(!offresOpen)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.875rem 1rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "var(--color-text)",
                        borderRadius: "var(--radius-md)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        style={{
                          transform: offresOpen ? "rotate(180deg)" : "none",
                          transition: "transform 0.2s",
                        }}
                      />
                    </button>
                    {offresOpen && (
                      <div style={{ paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                        {offresMenu.map((o) => (
                          <Link
                            key={o.href}
                            href={o.href}
                            style={{
                              display: "block",
                              padding: "0.625rem 1rem",
                              color: "var(--color-text-muted)",
                              fontSize: "0.9rem",
                              textDecoration: "none",
                              borderRadius: "var(--radius-sm)",
                            }}
                          >
                            {o.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.875rem 1rem",
                    borderRadius: "var(--radius-md)",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: pathname === item.href ? "600" : "400",
                    color: pathname === item.href ? "var(--color-primary)" : "var(--color-text)",
                    background: pathname === item.href ? "var(--color-bg-alt)" : "transparent",
                  }}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}

            <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--color-border)", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {user ? (
                <Link href="/espace-client" className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
                  <User size={16} />
                  Mon espace
                </Link>
              ) : (
                <Link href="/connexion" className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
                  <User size={16} />
                  Se connecter
                </Link>
              )}
              <Link href="/demande" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Faire une demande
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
