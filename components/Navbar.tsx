"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
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
  LogOut,
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useDictionary } from "./DictionaryProvider";
import { getLocalizedPath, type AppLocale } from "@/lib/routes";

export default function Navbar() {
  const { dict, lang } = useDictionary();
  const locale = lang as AppLocale;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [offresOpen, setOffresOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === `/${lang}` || pathname === "/";
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const offresMenu = [
    { label: dict?.offers?.personal || "Préstamo Personal", href: getLocalizedPath("offers_personal", locale), desc: dict?.offers?.personal_desc || "Financiación sin justificante" },
    { label: dict?.offers?.realestate || "Préstamo Hipotecario", href: getLocalizedPath("offers_realestate", locale), desc: dict?.offers?.realestate_desc || "Adquisición e inversión" },
    { label: dict?.offers?.professional || "Préstamo Profesional", href: getLocalizedPath("offers_professional", locale), desc: dict?.offers?.professional_desc || "Pymes, autónomos" },
    { label: dict?.offers?.consolidation || "Reagrupación de Créditos", href: getLocalizedPath("offers_consolidation", locale), desc: dict?.offers?.consolidation_desc || "Reagrupe sus créditos" },
    { label: dict?.offers?.renovation || "Préstamo Obras", href: getLocalizedPath("offers_renovation", locale), desc: dict?.offers?.renovation_desc || "Renovación y eco-obras" },
    { label: dict?.offers?.auto || "Préstamo Auto", href: getLocalizedPath("offers_auto", locale), desc: dict?.offers?.auto_desc || "Nuevo, ocasión y leasing" },
  ];

  const navItems = [
    { label: dict?.navbar?.home || "Inicio", href: getLocalizedPath("home", locale), icon: Home },
    { label: dict?.navbar?.simulator || "Simulador", href: getLocalizedPath("simulator", locale), icon: Calculator },
    { label: dict?.navbar?.offres || "Nuestras ofertas", href: getLocalizedPath("offers", locale), icon: FileText, hasDropdown: true },
    { label: dict?.navbar?.how_it_works || "Cómo funciona", href: getLocalizedPath("how_it_works", locale), icon: Info },
    { label: dict?.navbar?.blog || "Blog", href: getLocalizedPath("blog", locale), icon: FileText },
    { label: dict?.navbar?.faq || "FAQ", href: getLocalizedPath("faq", locale), icon: HelpCircle },
    { label: dict?.navbar?.contact || "Contacto", href: getLocalizedPath("contact", locale), icon: Phone },
  ];

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
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOffresOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setUserMenuOpen(false);
    window.location.href = getLocalizedPath("home", locale);
  }

  const isTransparent = false;
  const avatarUrl = user?.user_metadata?.avatar_url;
  const userName = user?.user_metadata?.first_name || user?.user_metadata?.full_name || user?.user_metadata?.name || "";

  return (
    <header
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      style={{
        background: isTransparent
          ? "transparent"
          : "rgba(255,255,255,0.85)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(26, 60, 94, 0.08)" : "none",
        borderBottom: scrolled ? "1px solid rgba(226, 232, 240, 0.6)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link
          href={getLocalizedPath("home", locale)}
          aria-label="FinancePro — Volver al inicio"
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
              transition: "color 0.3s",
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
                      color: isTransparent ? "rgba(255,255,255,0.85)" : "var(--color-text-muted)",
                      transition: "color 0.3s",
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
                style={{
                  color: isTransparent ? "rgba(255,255,255,0.85)" : undefined,
                  transition: "color 0.3s",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right side: User/Login → CTA → Language → Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>

          {/* User avatar or login button */}
          {user ? (
            <div style={{ position: "relative" }} ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="hide-mobile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.35rem 0.65rem",
                  borderRadius: "var(--radius-full)",
                  transition: "all 0.2s",
                }}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={userName}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid var(--color-accent)",
                    }}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <User size={16} color="white" />
                  </div>
                )}
                <AnimatePresence>
                  {userName && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        color: isTransparent ? "white" : "var(--color-text)",
                        maxWidth: "120px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        transition: "color 0.3s",
                      }}
                    >
                      {userName.split(" ")[0]}
                    </motion.span>
                  )}
                </AnimatePresence>
                <ChevronDown size={14} style={{
                  color: isTransparent ? "rgba(255,255,255,0.7)" : "var(--color-text-muted)",
                  transform: userMenuOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s, color 0.3s",
                }} />
              </button>

              {/* User dropdown menu */}
              {userMenuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 0.5rem)",
                    right: 0,
                    background: "white",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "var(--shadow-lg)",
                    border: "1px solid var(--color-border)",
                    overflow: "hidden",
                    zIndex: 1001,
                    minWidth: "180px",
                    animation: "scaleIn 0.15s ease-out",
                  }}
                >
                  <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--color-border)" }}>
                    <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--color-text)" }}>{userName}</p>
                    <p style={{ fontSize: "0.775rem", color: "var(--color-text-muted)" }}>{user.email}</p>
                  </div>
                  <Link
                    href={getLocalizedPath("client_area", locale)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.65rem 1rem",
                      color: "var(--color-text)",
                      fontSize: "0.875rem",
                      textDecoration: "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-bg-alt)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <User size={16} />
                    {dict?.navbar?.client_area || "Área de cliente"}
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.65rem 1rem",
                      width: "100%",
                      color: "var(--color-danger)",
                      fontSize: "0.875rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "var(--font-body)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,38,38,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <LogOut size={16} />
                    {dict?.navbar?.logout || "Cerrar sesión"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={getLocalizedPath("login", locale)}
              className="hide-mobile btn btn-ghost btn-sm"
              style={
                isTransparent
                  ? {
                      color: "rgba(255,255,255,0.8)",
                      borderColor: "rgba(255,255,255,0.3)",
                      transition: "all 0.3s",
                    }
                  : { transition: "all 0.3s" }
              }
            >
              <User size={15} />
              {dict?.navbar?.login || "Iniciar sesión"}
            </Link>
          )}

          {user && (
            <Link href={getLocalizedPath("client_area", locale)} className="btn btn-secondary btn-sm hide-mobile">
              <User size={15} />
              {dict?.navbar?.client_area || "Espace Client"}
            </Link>
          )}

          {/* CTA button */}
          <Link href={getLocalizedPath("request", locale)} className="btn btn-primary btn-sm">
            {dict?.common?.request_btn || dict?.common?.simulate_btn || "Hacer una solicitud"}
          </Link>

          {/* Language switcher - last item */}
          <LanguageSwitcher />

          {/* Mobile hamburger */}
          <button
            className="hide-desktop"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Cerrar el menú" : "Abrir el menú"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              color: isTransparent ? "white" : "var(--color-text)",
              transition: "color 0.3s",
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
          aria-label="Menú móvil"
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
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 1rem" }}>
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={userName} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--color-accent)" }} referrerPolicy="no-referrer" />
                    ) : (
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <User size={18} color="white" />
                      </div>
                    )}
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>{userName}</p>
                      <p style={{ fontSize: "0.775rem", color: "var(--color-text-muted)" }}>{user.email}</p>
                    </div>
                  </div>
                  <Link href={getLocalizedPath("client_area", locale)} className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
                    <User size={16} />
                    {dict?.navbar?.client_area || "Área de cliente"}
                  </Link>
                  <button onClick={handleLogout} className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", color: "var(--color-danger)", borderColor: "rgba(220,38,38,0.3)" }}>
                    <LogOut size={16} />
                    {dict?.navbar?.logout || "Cerrar sesión"}
                  </button>
                </>
              ) : (
                <Link href={getLocalizedPath("login", locale)} className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
                  <User size={16} />
                  {dict?.navbar?.login || "Iniciar sesión"}
                </Link>
              )}
              <Link href={getLocalizedPath("request", locale)} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                {dict?.common?.request_btn || "Hacer una solicitud"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
