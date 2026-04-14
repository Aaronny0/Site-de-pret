"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { logout } from "@/app/auth/actions";
import {
  TrendingUp,
  FileText,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  LogOut,
  ChevronRight,
  Download,
  Eye,
  Shield,
  Bell,
  PlusCircle,
} from "lucide-react";
import { getUserApplications, getUserProfile, updateUserProfile } from "@/app/demandes/actions";
import { getDocumentUrl } from "@/app/admin/actions";

// Demo data
const demoLoan = {
  number: "FP-2025-47823",
  type: "Prêt Personnel",
  amount: 15000,
  monthlyPayment: 285.50,
  remainingCapital: 12340.20,
  remainingMonths: 48,
  totalMonths: 60,
  startDate: "Janvier 2024",
  endDate: "Janvier 2029",
  rate: 5.50,
  taeg: 5.98,
  status: "En cours",
  nextPayment: "1er Mai 2025",
};

const demoPayments = [
  { date: "01/04/2025", amount: 285.50, status: "Réglé", method: "Prélèvement" },
  { date: "01/03/2025", amount: 285.50, status: "Réglé", method: "Prélèvement" },
  { date: "01/02/2025", amount: 285.50, status: "Réglé", method: "Prélèvement" },
  { date: "01/01/2025", amount: 285.50, status: "Réglé", method: "Prélèvement" },
  { date: "01/12/2024", amount: 285.50, status: "Réglé", method: "Prélèvement" },
];

const demoDocuments = [
  { name: "Offre de prêt signée", date: "15/01/2024", type: "PDF", size: "245 Ko" },
  { name: "Tableau d'amortissement", date: "15/01/2024", type: "PDF", size: "180 Ko" },
  { name: "FICHE IOBSP", date: "10/01/2024", type: "PDF", size: "95 Ko" },
  { name: "Conditions Générales", date: "10/01/2024", type: "PDF", size: "320 Ko" },
  { name: "Attestation de contrat", date: "20/01/2024", type: "PDF", size: "115 Ko" },
];

export default function EspaceClientPage() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [applications, setApplications] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [notifications, setNotifications] = useState(1);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/connexion");
        return;
      }
      setUser(user);

      // Charger les demandes et le profil
      const [appsRes, profileRes] = await Promise.all([
        getUserApplications(user.id),
        getUserProfile(user.id)
      ]);

      if (appsRes.success) setApplications(appsRes.applications || []);
      if (profileRes.success) setProfile(profileRes.profile || null);

      setLoading(false);
    }
    loadData();
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSavingProfile(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
    };

    const res = await updateUserProfile(user.id, data);
    if (res.success) {
      setProfile(res.profile);
      alert("Profil mis à jour avec succès !");
    } else {
      alert("Erreur : " + res.error);
    }
    setIsSavingProfile(false);
  };

  const progress = Math.round(((demoLoan.totalMonths - demoLoan.remainingMonths) / demoLoan.totalMonths) * 100);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-heading)", color: "var(--color-primary)", fontWeight: "600" }}>Chargement de votre espace sécurisé...</p>
      </div>
    );
  }

  // Dashboard - Filtrer les onglets (masquer Mensualités s'il n'y a pas de prêt actif/approuvé)
  const hasActiveLoan = applications.some(app => app.status === 'approved');
  
  const tabs = [
    { id: "overview", label: "Vue d'ensemble", icon: TrendingUp },
    ...(hasActiveLoan ? [{ id: "payments", label: "Mensualités", icon: Clock }] : []),
    { id: "documents", label: "Mes documents", icon: FileText },
    { id: "profile", label: "Mon profil", icon: User },
  ];

  const latestApp = applications[0];

  return (
    <>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)) ", padding: "1.5rem 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem" }}>Bonjour,</p>
            <h1 style={{ color: "white", fontFamily: "var(--font-body)", fontSize: "1.35rem", fontWeight: "700" }}>
              {user?.user_metadata?.first_name || "Client"} {user?.user_metadata?.last_name || ""}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button style={{ position: "relative", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }} aria-label={`${notifications} notifications non lues`}>
              <Bell size={18} />
              {notifications > 0 && (
                <span style={{ position: "absolute", top: "-4px", right: "-4px", background: "var(--color-danger)", color: "white", width: "18px", height: "18px", borderRadius: "50%", fontSize: "0.7rem", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {notifications}
                </span>
              )}
            </button>
            <button
              onClick={() => logout()}
              className="btn btn-sm"
              style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", color: "white", display: "flex", alignItems: "center", gap: "0.4rem" }}
            >
              <LogOut size={14} />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "var(--color-primary-dark)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="container">
          <div style={{ display: "flex", gap: "0" }} role="tablist" aria-label="Sections de l'espace client">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                onClick={() => setActiveTab(id)}
                style={{
                  padding: "1rem 1.5rem",
                  background: "none",
                  border: "none",
                  borderBottom: `3px solid ${activeTab === id ? "var(--color-accent)" : "transparent"}`,
                  color: activeTab === id ? "white" : "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9rem",
                  fontWeight: activeTab === id ? "600" : "400",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section style={{ background: "var(--color-bg)", padding: "2.5rem 0 5rem" }}>
        <div className="container">

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
              <div>
                {/* Loan card or Application Status */}
                {latestApp ? (
                  <div className="card" style={{ padding: "0", overflow: "hidden", marginBottom: "1.5rem" }}>
                    <div style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))", padding: "1.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                        <div>
                          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", marginBottom: "0.25rem" }}>{latestApp.loan_type}</p>
                          <p style={{ color: "white", fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}>N° {latestApp.dossier_number}</p>
                        </div>
                        <span className={`badge ${
                          latestApp.status === 'pending' ? 'badge-primary' : 
                          latestApp.status === 'approved' ? 'badge-success' : 
                          latestApp.status === 'rejected' ? 'badge-danger' : 'badge-info'
                        }`}>
                          {latestApp.status === 'pending' ? 'En attente' : 
                           latestApp.status === 'processing' ? 'En cours' : 
                           latestApp.status === 'approved' ? 'Approuvé' : 
                           latestApp.status === 'rejected' ? 'Refusé' : latestApp.status}
                        </span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                        {[
                          { l: "Montant demandé", v: `${latestApp.amount.toLocaleString()} €` },
                          { l: "Durée", v: `${latestApp.duration} mois` },
                          { l: "Date de demande", v: new Date(latestApp.created_at).toLocaleDateString() },
                        ].map(({ l, v }) => (
                          <div key={l}>
                            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>{l}</p>
                            <p style={{ color: "white", fontFamily: "var(--font-mono)", fontWeight: "700", fontSize: "1.1rem" }}>{v}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {latestApp.status === 'approved' && (
                      <div style={{ padding: "1.25rem 1.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                          <p style={{ fontSize: "0.875rem", fontWeight: "600" }}>Validation du dossier</p>
                          <span style={{ fontFamily: "var(--font-mono)", fontWeight: "700", color: "var(--color-accent)" }}>100%</span>
                        </div>
                        <div className="progress-container">
                          <div className="progress-bar" style={{ width: `100%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="card" style={{ padding: "2.5rem", textAlign: "center", marginBottom: "1.5rem" }}>
                    <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(42,95,158,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                      <PlusCircle size={30} style={{ color: "var(--color-primary)" }} />
                    </div>
                    <h3 style={{ marginBottom: "0.5rem" }}>Vous n'avez pas encore de demande</h3>
                    <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                      Réalisez votre simulation en quelques minutes et obtenez une réponse de principe immédiate.
                    </p>
                    <Link href="/fr/demande" className="btn btn-primary">Faire une demande</Link>
                  </div>
                )}

                {/* Notifications */}
                <div className="card" style={{ padding: "1.25rem 1.5rem", marginBottom: "1.5rem" }}>
                  <h2 style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>
                    Notifications ({notifications})
                  </h2>
                  {latestApp?.status === 'pending' ? (
                    <div style={{ display: "flex", gap: "0.75rem", padding: "0.75rem 0", alignItems: "center" }}>
                      <Clock size={18} style={{ color: "var(--color-primary-light)", flexShrink: 0 }} />
                      <p style={{ fontSize: "0.9rem", color: "var(--color-text)" }}>Votre demande n° {latestApp.dossier_number} est en cours d'analyse par nos conseillers.</p>
                    </div>
                  ) : (
                    <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>Aucune nouvelle notification.</p>
                  )}
                </div>

                {/* Key info */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[
                    { l: "Taux débiteur fixe", v: `${demoLoan.rate.toFixed(2)} %` },
                    { l: "TAEG fixe", v: `${demoLoan.taeg.toFixed(2)} %` },
                    { l: "Prochaine échéance", v: demoLoan.nextPayment },
                    { l: "Début du crédit", v: demoLoan.startDate },
                  ].map(({ l, v }) => (
                    <div key={l} className="card" style={{ padding: "1.25rem" }}>
                      <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "0.25rem" }}>{l}</p>
                      <p style={{ fontFamily: "var(--font-mono)", fontWeight: "700", fontSize: "1.1rem", color: "var(--color-text)" }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div className="card" style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: "700", marginBottom: "1rem" }}>Actions rapides</h3>
                  {[
                    { label: "Télécharger le tableau d'amortissement", icon: Download, href: "#" },
                    { label: "Simuler un remboursement anticipé", icon: TrendingUp, href: "/simulateur" },
                    { label: "Contacter mon conseiller", icon: User, href: "/contact" },
                    { label: "Déposer un document", icon: FileText, href: "#" },
                  ].map(({ label, icon: Icon, href }) => (
                    <Link
                      key={label}
                      href={href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem",
                        borderRadius: "var(--radius-md)",
                        textDecoration: "none",
                        color: "var(--color-text)",
                        fontSize: "0.875rem",
                        transition: "background 0.2s",
                        marginBottom: "0.25rem",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-bg-alt)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <Icon size={16} style={{ color: "var(--color-primary-light)", flexShrink: 0 }} />
                      {label}
                      <ChevronRight size={14} style={{ color: "var(--color-text-muted)", marginLeft: "auto" }} />
                    </Link>
                  ))}
                </div>

                <div className="card" style={{ padding: "1.5rem", background: "rgba(0,200,150,0.06)", border: "1px solid rgba(0,200,150,0.2)" }}>
                  <h3 style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", fontWeight: "700", marginBottom: "0.75rem", color: "var(--color-accent-dark)" }}>
                    Votre conseiller
                  </h3>
                  <div style={{ display: "flex", gap: "0.875rem", alignItems: "center" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <User size={22} color="white" />
                    </div>
                    <div>
                      <p style={{ fontWeight: "700", fontSize: "0.9rem" }}>Marie Leclerc</p>
                      <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Conseillère crédit</p>
                      <a href="tel:+33100000000" style={{ fontSize: "0.8rem", color: "var(--color-primary-light)" }}>01 00 00 00 00</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div>
              <h2 style={{ marginBottom: "1.5rem" }}>Historique des mensualités</h2>
              <div className="card" style={{ padding: "0", overflow: "hidden" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Montant</th>
                      <th>Mode</th>
                      <th>Statut</th>
                      <th>Justificatif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoPayments.map((p, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: "var(--font-mono)" }}>{p.date}</td>
                        <td style={{ fontFamily: "var(--font-mono)", fontWeight: "700" }}>{p.amount.toFixed(2)} €</td>
                        <td>{p.method}</td>
                        <td>
                          <span className="badge badge-success" style={{ fontSize: "0.75rem" }}>
                            <CheckCircle size={11} />
                            {p.status}
                          </span>
                        </td>
                        <td>
                          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-primary-light)", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem" }}>
                            <Download size={13} />
                            PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div>
              <h2 style={{ marginBottom: "1.5rem" }}>Mes documents téléversés</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {applications.length > 0 ? (
                  applications.flatMap(app => (app.documents || []).map((doc: any, i: number) => (
                    <div key={`${app.id}-${i}`} className="card" style={{ padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <div style={{ width: "44px", height: "44px", borderRadius: "var(--radius-md)", background: "rgba(42,95,158,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <FileText size={20} style={{ color: "var(--color-primary)" }} />
                        </div>
                        <div>
                          <p style={{ fontWeight: "600", fontSize: "0.9rem" }}>{doc.label}</p>
                          <p style={{ fontSize: "0.775rem", color: "var(--color-text-muted)" }}>{doc.name} — {doc.size}</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={async () => {
                            const res = await getDocumentUrl(doc.path);
                            if (res.success && res.url) window.open(res.url, '_blank');
                          }}
                          style={{ background: "none", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", padding: "0.375rem 0.75rem", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-body)" }}
                        >
                          <Eye size={13} />Voir
                        </button>
                        <button
                          onClick={async () => {
                            const res = await getDocumentUrl(doc.path);
                            if (res.success && res.url) {
                              const link = document.createElement('a');
                              link.href = res.url;
                              link.download = doc.name;
                              link.click();
                            }
                          }}
                          style={{ background: "var(--color-primary)", color: "white", border: "none", borderRadius: "var(--radius-sm)", padding: "0.375rem 0.75rem", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-body)" }}
                        >
                          <Download size={13} />Télécharger
                        </button>
                      </div>
                    </div>
                  )))
                ) : (
                  <p style={{ color: "var(--color-text-muted)" }}>Aucun document disponible.</p>
                )}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div style={{ maxWidth: "600px" }}>
              <h2 style={{ marginBottom: "1.5rem" }}>Mon profil</h2>
              <form className="card" style={{ padding: "2rem" }} onSubmit={handleUpdateProfile}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {[
                    { l: "Prénom", v: profile?.first_name || user?.user_metadata?.first_name || "", name: "first_name" },
                    { l: "Nom", v: profile?.last_name || user?.user_metadata?.last_name || "", name: "last_name" },
                    { l: "Email", v: user?.email || "", name: "email", disabled: true },
                    { l: "Téléphone", v: profile?.phone || "", name: "phone" },
                    { l: "Adresse", v: profile?.address || "", name: "address" },
                    { l: "Ville", v: profile?.city || "", name: "city" },
                  ].map(({ l, v, name, disabled }) => (
                    <div className="form-group" key={name}>
                      <label className="form-label" htmlFor={name}>{l}</label>
                      <input 
                        id={name} 
                        name={name}
                        type="text" 
                        className="form-input" 
                        defaultValue={v} 
                        disabled={disabled}
                      />
                    </div>
                  ))}
                  <button 
                    type="submit" 
                    disabled={isSavingProfile}
                    className="btn btn-primary" 
                    style={{ alignSelf: "flex-start" }}
                  >
                    {isSavingProfile ? "Enregistrement..." : "Enregistrer les modifications"}
                  </button>
                </div>
              </form>

              <div className="card" style={{ padding: "1.5rem", marginTop: "1.25rem" }}>
                <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: "700", marginBottom: "1rem" }}>
                  Sécurité
                </h3>
                <button className="btn btn-ghost btn-sm" style={{ marginBottom: "0.5rem", width: "100%", justifyContent: "flex-start" }}>
                  <Shield size={15} />
                  Changer mon mot de passe
                </button>
                <button className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "flex-start" }}>
                  <Shield size={15} />
                  Activer l&apos;authentification 2 facteurs
                </button>
              </div>

              <div className="card" style={{ padding: "1.5rem", marginTop: "1.25rem", borderLeft: "3px solid var(--color-danger)" }}>
                <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: "700", marginBottom: "0.75rem", color: "var(--color-danger)" }}>
                  Mes données personnelles
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>
                  Conformément au RGPD, vous pouvez télécharger ou demander la suppression de vos données.
                </p>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button className="btn btn-ghost btn-sm"><Download size={13} />Exporter mes données</button>
                  <button className="btn btn-sm" style={{ background: "rgba(220,38,38,0.08)", borderColor: "rgba(220,38,38,0.3)", color: "var(--color-danger)" }}>Supprimer mon compte</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
