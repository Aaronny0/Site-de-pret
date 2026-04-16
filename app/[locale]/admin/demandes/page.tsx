'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Users,
  Eye,
  X,
  CheckCircle,
  XCircle,
  MessageSquare,
  FileText,
  User,
  Briefcase,
  Home,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Download,
  FileImage,
  FileBadge,
  CreditCard,
  Building2,
  Clock,
} from 'lucide-react'
import { getAllDemandes, updateDemandeStatus, getDocumentUrl, requestMissingDocuments } from '@/app/admin/actions'

// ─── Demo Data (All 5 steps) ────────────────────────────────────────────────
const demoDemandes = [
  {
    id: '1',
    dossier_number: 'FP-2026-48291',
    status: 'pending' as DemoStatus,
    created_at: '2026-04-09T14:30:00Z',
    // Step 1 — Projet
    project: {
      loanType: 'Prêt Personnel',
      purpose: 'Rénovation complète de la cuisine et salle de bain',
      amount: 15000,
      duration: 60,
      neededBy: '2026-06-01',
    },
    // Step 2 — Situation personnelle
    personal: {
      civility: 'M.',
      firstName: 'Carlos',
      lastName: 'García',
      birthDate: '1985-03-15',
      nationality: 'Espagnole',
      maritalStatus: 'Marié(e)',
      dependents: 2,
      address: 'Calle Gran Vía 42, 3°A',
      zipCode: '28013',
      city: 'Madrid',
      email: 'carlos.garcia@email.com',
      phone: '+34 612 345 678',
    },
    // Step 3 — Situation financière
    financial: {
      professionalStatus: 'CDI',
      employer: 'Telefónica S.A.',
      seniority: '3 - 5 ans',
      monthlyIncome: 3200,
      otherIncome: 0,
      monthlyCharges: 850,
      existingCredits: 200,
      savings: 8000,
      housingStatus: 'Propriétaire',
    },
    // Step 4 — Documents
    documents: [
      { id: 'identity', label: "Pièce d'identité", name: 'DNI_Carlos_Garcia.pdf', type: 'PDF', size: '1.2 Mo', uploaded_at: '2026-04-09', path: '' },
      { id: 'salary', label: 'Justificatif de revenus', name: 'nominas_2026_Q1.pdf', type: 'PDF', size: '890 Ko', uploaded_at: '2026-04-09', path: '' },
      { id: 'bank', label: 'Relevés bancaires', name: 'extractos_bancarios.pdf', type: 'PDF', size: '2.1 Mo', uploaded_at: '2026-04-09', path: '' },
      { id: 'domicile', label: 'Justificatif de domicile', name: 'factura_iberdrola.pdf', type: 'PDF', size: '450 Ko', uploaded_at: '2026-04-09', path: '' },
      { id: 'rib', label: 'RIB', name: 'IBAN_CaixaBank.pdf', type: 'PDF', size: '120 Ko', uploaded_at: '2026-04-09', path: '' },
    ],
    // Step 5 — Consentements
    consents: {
      cgu: true,
      privacy: true,
      accuracy: true,
      processing: true,
      marketing: false,
    },
    notes: null,
    assigned_advisor: null,
  },
  {
    id: '2',
    dossier_number: 'FP-2026-48292',
    status: 'processing' as DemoStatus,
    created_at: '2026-04-08T10:15:00Z',
    project: { loanType: 'Prêt Immobilier', purpose: 'Acquisition résidence principale — appartement T4', amount: 220000, duration: 240, neededBy: '2026-09-01' },
    personal: { civility: 'Mme', firstName: 'Ana', lastName: 'Rodríguez', birthDate: '1990-07-22', nationality: 'Espagnole', maritalStatus: 'Célibataire', dependents: 0, address: 'Avinguda Diagonal 580', zipCode: '08021', city: 'Barcelona', email: 'ana.rodriguez@email.com', phone: '+34 634 567 890' },
    financial: { professionalStatus: 'CDI', employer: 'Deloitte España', seniority: '+ 5 ans', monthlyIncome: 4500, otherIncome: 300, monthlyCharges: 600, existingCredits: 0, savings: 45000, housingStatus: 'Locataire' },
    documents: [
      { id: 'identity', label: "Pièce d'identité", name: 'DNI_Ana_Rodriguez.pdf', type: 'PDF', size: '1.1 Mo', uploaded_at: '2026-04-08', path: '' },
      { id: 'salary', label: 'Justificatif de revenus', name: 'nominas_deloitte.pdf', type: 'PDF', size: '1.5 Mo', uploaded_at: '2026-04-08', path: '' },
      { id: 'bank', label: 'Relevés bancaires', name: 'extractos_BBVA.pdf', type: 'PDF', size: '2.8 Mo', uploaded_at: '2026-04-08', path: '' },
      { id: 'domicile', label: 'Justificatif de domicile', name: 'recibo_agua.pdf', type: 'PDF', size: '380 Ko', uploaded_at: '2026-04-08', path: '' },
      { id: 'rib', label: 'RIB', name: 'IBAN_BBVA.pdf', type: 'PDF', size: '98 Ko', uploaded_at: '2026-04-08', path: '' },
      { id: 'other', label: 'Document complémentaire', name: 'compromis_vente_apt.pdf', type: 'PDF', size: '3.2 Mo', uploaded_at: '2026-04-08', path: '' },
    ],
    consents: { cgu: true, privacy: true, accuracy: true, processing: true, marketing: true },
    notes: 'Dossier solide. Attente de l\'évaluation immobilière.',
    assigned_advisor: 'Marie Leclerc',
  },
  {
    id: '3',
    dossier_number: 'FP-2026-48293',
    status: 'approved' as DemoStatus,
    created_at: '2026-04-07T08:45:00Z',
    project: { loanType: 'Prêt Auto', purpose: 'Achat véhicule neuf — Seat León 2026', amount: 22000, duration: 48, neededBy: '2026-05-15' },
    personal: { civility: 'M.', firstName: 'Miguel', lastName: 'Torres', birthDate: '1978-11-03', nationality: 'Espagnole', maritalStatus: 'Marié(e)', dependents: 3, address: 'Calle Sierpes 88', zipCode: '41004', city: 'Sevilla', email: 'miguel.torres@email.com', phone: '+34 655 789 012' },
    financial: { professionalStatus: 'Fonctionnaire', employer: 'Junta de Andalucía', seniority: '+ 5 ans', monthlyIncome: 2800, otherIncome: 400, monthlyCharges: 700, existingCredits: 150, savings: 12000, housingStatus: 'Propriétaire' },
    documents: [
      { id: 'identity', label: "Pièce d'identité", name: 'DNI_Miguel_Torres.pdf', type: 'PDF', size: '1.0 Mo', uploaded_at: '2026-04-07', path: '' },
      { id: 'salary', label: 'Justificatif de revenus', name: 'nominas_junta.pdf', type: 'PDF', size: '750 Ko', uploaded_at: '2026-04-07', path: '' },
      { id: 'bank', label: 'Relevés bancaires', name: 'extractos_unicaja.pdf', type: 'PDF', size: '1.9 Mo', uploaded_at: '2026-04-07', path: '' },
      { id: 'domicile', label: 'Justificatif de domicile', name: 'recibo_endesa.pdf', type: 'PDF', size: '320 Ko', uploaded_at: '2026-04-07', path: '' },
      { id: 'rib', label: 'RIB', name: 'IBAN_Unicaja.pdf', type: 'PDF', size: '105 Ko', uploaded_at: '2026-04-07', path: '' },
      { id: 'other', label: 'Document complémentaire', name: 'factura_proforma_seat.pdf', type: 'PDF', size: '680 Ko', uploaded_at: '2026-04-07', path: '' },
    ],
    consents: { cgu: true, privacy: true, accuracy: true, processing: true, marketing: false },
    notes: 'Fonctionnaire depuis +15 ans. Dossier approuvé sans réserve.',
    assigned_advisor: 'Pierre Dumont',
  },
  {
    id: '4',
    dossier_number: 'FP-2026-48294',
    status: 'rejected' as DemoStatus,
    created_at: '2026-04-06T16:20:00Z',
    project: { loanType: 'Rachat de Crédit', purpose: 'Regroupement de 3 prêts existants', amount: 45000, duration: 84, neededBy: '2026-05-01' },
    personal: { civility: 'Mme', firstName: 'Isabel', lastName: 'Martín', birthDate: '1992-01-28', nationality: 'Espagnole', maritalStatus: 'Divorcé(e)', dependents: 1, address: 'Calle Larios 15', zipCode: '29015', city: 'Málaga', email: 'isabel.martin@email.com', phone: '+34 678 901 234' },
    financial: { professionalStatus: 'CDD', employer: 'Hotel NH Málaga', seniority: '< 6 mois', monthlyIncome: 1600, otherIncome: 200, monthlyCharges: 950, existingCredits: 780, savings: 1500, housingStatus: 'Locataire' },
    documents: [
      { id: 'identity', label: "Pièce d'identité", name: 'DNI_Isabel_Martin.pdf', type: 'PDF', size: '980 Ko', uploaded_at: '2026-04-06', path: '' },
      { id: 'salary', label: 'Justificatif de revenus', name: 'nominas_NH.pdf', type: 'PDF', size: '650 Ko', uploaded_at: '2026-04-06', path: '' },
      { id: 'bank', label: 'Relevés bancaires', name: 'extractos_santander.pdf', type: 'PDF', size: '2.4 Mo', uploaded_at: '2026-04-06', path: '' },
    ],
    consents: { cgu: true, privacy: true, accuracy: true, processing: true, marketing: false },
    notes: 'Taux d\'endettement trop élevé (>48%). CDD < 6 mois.',
    assigned_advisor: null,
  },
  {
    id: '5',
    dossier_number: 'FP-2026-48295',
    status: 'pending' as DemoStatus,
    created_at: '2026-04-05T11:00:00Z',
    project: { loanType: 'Prêt Travaux', purpose: 'Installation panneaux solaires + isolation thermique', amount: 18000, duration: 72, neededBy: '2026-07-01' },
    personal: { civility: 'M.', firstName: 'Pedro', lastName: 'Sánchez', birthDate: '1980-05-20', nationality: 'Espagnole', maritalStatus: 'Pacsé(e)', dependents: 1, address: 'Calle de Alcalá 200', zipCode: '28028', city: 'Madrid', email: 'pedro.sanchez@email.com', phone: '+34 690 123 456' },
    financial: { professionalStatus: 'Indépendant / Auto-entrepreneur', employer: 'SánchezTech SL', seniority: '3 - 5 ans', monthlyIncome: 3800, otherIncome: 0, monthlyCharges: 1100, existingCredits: 0, savings: 15000, housingStatus: 'Propriétaire' },
    documents: [
      { id: 'identity', label: "Pièce d'identité", name: 'DNI_Pedro_Sanchez.pdf', type: 'PDF', size: '1.1 Mo', uploaded_at: '2026-04-05', path: '' },
      { id: 'salary', label: 'Justificatif de revenus', name: 'declaracion_renta_2025.pdf', type: 'PDF', size: '2.1 Mo', uploaded_at: '2026-04-05', path: '' },
      { id: 'bank', label: 'Relevés bancaires', name: 'extractos_ING.pdf', type: 'PDF', size: '1.8 Mo', uploaded_at: '2026-04-05', path: '' },
      { id: 'domicile', label: 'Justificatif de domicile', name: 'recibo_gas.pdf', type: 'PDF', size: '290 Ko', uploaded_at: '2026-04-05', path: '' },
      { id: 'rib', label: 'RIB', name: 'IBAN_ING.pdf', type: 'PDF', size: '110 Ko', uploaded_at: '2026-04-05', path: '' },
      { id: 'other', label: 'Document complémentaire', name: 'devis_panneaux_solaires.pdf', type: 'PDF', size: '1.5 Mo', uploaded_at: '2026-04-05', path: '' },
    ],
    consents: { cgu: true, privacy: true, accuracy: true, processing: true, marketing: true },
    notes: null,
    assigned_advisor: null,
  },
]

type DemoStatus = 'pending' | 'processing' | 'approved' | 'rejected'

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  pending: { label: 'En attente', color: '#D97706', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  processing: { label: 'En traitement', color: '#2563EB', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)' },
  approved: { label: 'Approuvé', color: '#059669', bg: 'rgba(0,200,150,0.1)', border: 'rgba(0,200,150,0.3)' },
  rejected: { label: 'Rejeté', color: '#DC2626', bg: 'rgba(220,38,38,0.1)', border: 'rgba(220,38,38,0.3)' },
}

const docIcons: Record<string, React.ElementType> = {
  identity: FileBadge,
  salary: CreditCard,
  bank: Building2,
  domicile: Home,
  rib: CreditCard,
  other: FileText,
}

type DemoDemande = typeof demoDemandes[0]

// ─── Detail Panel ───────────────────────────────────────────────────────────
function DetailPanel({ demande, onClose, onStatusChange, onReclamation }: {
  demande: DemoDemande
  onClose: () => void
  onStatusChange: (id: string, status: string, notes?: string) => void
  onReclamation: (id: string, notes: string) => void
}) {
  const [activeTab, setActiveTab] = useState<'projet' | 'situation' | 'documents' | 'actions'>('projet')
  const [notes, setNotes] = useState(demande.notes || '')
  const sc = statusConfig[demande.status]

  const tabs = [
    { id: 'projet' as const, label: 'Projet', icon: FileText },
    { id: 'situation' as const, label: 'Situation', icon: User },
    { id: 'documents' as const, label: 'Documents', icon: FileImage },
    { id: 'actions' as const, label: 'Actions', icon: CheckCircle },
  ]

  const debtRatio = demande.financial.monthlyIncome > 0
    ? (((demande.financial.existingCredits + demande.financial.monthlyCharges) / demande.financial.monthlyIncome) * 100).toFixed(1)
    : '0'

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 'min(680px, 95vw)',
        background: 'white',
        boxShadow: '-10px 0 50px rgba(0,0,0,0.15)',
        zIndex: 1200,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
            {demande.dossier_number}
          </p>
          <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', fontWeight: 700 }}>
            {demande.personal.firstName} {demande.personal.lastName}
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            padding: '0.3rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.775rem',
            fontWeight: 600,
            color: sc.color,
            background: sc.bg,
            border: `1px solid ${sc.border}`,
          }}>
            {sc.label}
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0.25rem' }}>
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', flexShrink: 0 }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              flex: 1,
              padding: '0.875rem 0.5rem',
              background: 'none',
              border: 'none',
              borderBottom: `3px solid ${activeTab === id ? 'var(--color-accent)' : 'transparent'}`,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              fontWeight: activeTab === id ? 600 : 400,
              color: activeTab === id ? 'var(--color-primary)' : 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s',
            }}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
        {/* PROJET TAB */}
        {activeTab === 'projet' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} style={{ color: 'var(--color-accent)' }} />
              Détails du projet
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{gap: '1rem'}}>
              {[
                { l: 'Type de financement', v: demande.project.loanType },
                { l: 'Montant demandé', v: `${demande.project.amount.toLocaleString('fr-FR')} €` },
                { l: 'Durée souhaitée', v: `${demande.project.duration} mois` },
                { l: 'Besoin des fonds', v: demande.project.neededBy || 'Non précisé' },
              ].map(({ l, v }) => (
                <div key={l} style={{ padding: '0.875rem', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>{l}</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            {demande.project.purpose && (
              <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Objet du prêt</span>
                <p style={{ fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.6 }}>{demande.project.purpose}</p>
              </div>
            )}

            {/* Consents */}
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem' }}>Consentements</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'CGU acceptées', value: demande.consents.cgu },
                { label: 'Politique de confidentialité', value: demande.consents.privacy },
                { label: 'Exactitude des informations', value: demande.consents.accuracy },
                { label: 'Traitement des données', value: demande.consents.processing },
                { label: 'Communications marketing', value: demande.consents.marketing },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                  {value ? <CheckCircle size={14} style={{ color: 'var(--color-accent)' }} /> : <XCircle size={14} style={{ color: 'var(--color-text-muted)' }} />}
                  <span style={{ color: value ? 'var(--color-text)' : 'var(--color-text-muted)' }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* SITUATION TAB */}
        {activeTab === 'situation' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {/* Personal Info */}
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={18} style={{ color: 'var(--color-primary-light)' }} />
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{gap: '0.75rem', marginBottom: '2rem'}}>
              {[
                { icon: User, l: 'Identité', v: `${demande.personal.civility} ${demande.personal.firstName} ${demande.personal.lastName}` },
                { icon: Calendar, l: 'Date de naissance', v: new Date(demande.personal.birthDate).toLocaleDateString('fr-FR') },
                { icon: MapPin, l: 'Nationalité', v: demande.personal.nationality },
                { icon: Users, l: 'Situation familiale', v: demande.personal.maritalStatus },
                { icon: Users, l: 'Personnes à charge', v: String(demande.personal.dependents) },
                { icon: MapPin, l: 'Adresse', v: `${demande.personal.address}, ${demande.personal.zipCode} ${demande.personal.city}` },
                { icon: Mail, l: 'Email', v: <a href={`mailto:${demande.personal.email}`} style={{ color: 'var(--color-info)', textDecoration: 'underline' }}>{demande.personal.email || "Non renseigné"}</a> },
                { icon: Phone, l: 'Téléphone', v: demande.personal.phone },
              ].map(({ icon: Icon, l, v }) => (
                <div key={l} style={{ padding: '0.75rem', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Icon size={16} style={{ color: 'var(--color-text-muted)', marginTop: '0.15rem', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block' }}>{l}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{v}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Info */}
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={18} style={{ color: 'var(--color-gold)' }} />
              Situation financière
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{gap: '0.75rem'}}>
              {[
                { l: 'Statut pro', v: demande.financial.professionalStatus },
                { l: 'Employeur', v: demande.financial.employer || '-' },
                { l: 'Ancienneté', v: demande.financial.seniority || '-' },
                { l: 'Revenus nets/mois', v: `${demande.financial.monthlyIncome.toLocaleString('fr-FR')} €` },
                { l: 'Autres revenus', v: `${demande.financial.otherIncome.toLocaleString('fr-FR')} €` },
                { l: 'Charges mensuelles', v: `${demande.financial.monthlyCharges.toLocaleString('fr-FR')} €` },
                { l: 'Crédits en cours', v: `${demande.financial.existingCredits.toLocaleString('fr-FR')} €/mois` },
                { l: 'Épargne', v: `${demande.financial.savings.toLocaleString('fr-FR')} €` },
                { l: 'Hébergement', v: demande.financial.housingStatus },
                { l: 'Taux endettement', v: `${debtRatio}%` },
              ].map(({ l, v }) => (
                <div key={l} style={{ padding: '0.75rem', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block' }}>{l}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, fontFamily: l.includes('€') || l.includes('%') ? 'var(--font-mono)' : 'var(--font-body)' }}>{v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileImage size={18} style={{ color: '#8B5CF6' }} />
              Documents téléversés ({demande.documents.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {demande.documents.map((doc) => {
                const DocIcon = docIcons[doc.id] || FileText
                return (
                  <div
                    key={doc.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem',
                      background: 'var(--color-bg-alt)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                      <div style={{
                        width: '42px', height: '42px', borderRadius: 'var(--radius-md)',
                        background: 'rgba(139,92,246,0.1)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <DocIcon size={20} style={{ color: '#8B5CF6' }} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.15rem' }}>{doc.label}</p>
                        <p style={{ fontSize: '0.775rem', color: 'var(--color-text-muted)' }}>
                          {doc.name} — {doc.size} — {doc.uploaded_at}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={async () => {
                          if (!doc.path) return;
                          const res = await getDocumentUrl(doc.path);
                          if (res.success && res.url) {
                            window.open(res.url, '_blank');
                          } else {
                            alert("Erreur lors de la récupération du lien : " + res.error);
                          }
                        }}
                        style={{
                          background: 'none', border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)', padding: '0.375rem 0.75rem',
                          cursor: 'pointer', fontSize: '0.8rem', display: 'flex',
                          alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-body)',
                          color: 'var(--color-text)',
                        }}
                      >
                        <Eye size={13} /> Voir
                      </button>
                      <button
                        onClick={async () => {
                          if (!doc.path) return;
                          const res = await getDocumentUrl(doc.path);
                          if (res.success && res.url) {
                            const link = document.createElement('a');
                            link.href = res.url;
                            link.download = doc.name;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          } else {
                            alert("Erreur lors de la récupération du lien : " + res.error);
                          }
                        }}
                        style={{
                          background: 'var(--color-primary)', color: 'white',
                          border: 'none', borderRadius: 'var(--radius-sm)',
                          padding: '0.375rem 0.75rem', cursor: 'pointer',
                          fontSize: '0.8rem', display: 'flex', alignItems: 'center',
                          gap: '0.3rem', fontFamily: 'var(--font-body)',
                        }}
                      >
                        <Download size={13} /> Télécharger
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {demande.documents.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                <FileText size={40} style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
                <p>Aucun document téléversé</p>
              </div>
            )}
          </motion.div>
        )}

        {/* ACTIONS TAB */}
        {activeTab === 'actions' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Actions administrateur
            </h3>

            {/* Notes */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                Notes internes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ajouter des notes sur ce dossier..."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '0.875rem',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  resize: 'vertical',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            {/* Advisor assignment */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                Conseiller assigné
              </label>
              <select className="form-select" defaultValue={demande.assigned_advisor || ''}>
                <option value="">Non assigné</option>
                <option>Marie Leclerc</option>
                <option>Pierre Dumont</option>
                <option>Sophie Lambert</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => onStatusChange(demande.id, 'approved', notes)}
                className="btn"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  background: 'var(--color-accent)',
                  color: 'white',
                  borderColor: 'var(--color-accent)',
                  gap: '0.5rem',
                }}
              >
                <CheckCircle size={18} />
                Approuver la demande
              </button>
              <button
                onClick={() => onStatusChange(demande.id, 'rejected', notes)}
                className="btn"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  background: 'rgba(220,38,38,0.08)',
                  color: 'var(--color-danger)',
                  borderColor: 'rgba(220,38,38,0.3)',
                  gap: '0.5rem',
                }}
              >
                <XCircle size={18} />
                Refuser la demande
              </button>
              <button
                onClick={() => onReclamation(demande.id, notes)}
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}
              >
                <MessageSquare size={18} />
                Demander des pièces complémentaires
              </button>
            </div>

            {/* Info */}
            <div className="alert alert-info" style={{ marginTop: '1.5rem' }}>
              <Clock size={16} style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.825rem' }}>
                Dossier soumis le {new Date(demande.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}.
                {demande.assigned_advisor && ` Assigné à ${demande.assigned_advisor}.`}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Main Demandes Page ─────────────────────────────────────────────────────
export default function AdminDemandesPage() {
  const [selectedDemande, setSelectedDemande] = useState<DemoDemande | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [demandes, setDemandes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getAllDemandes()
        if (res.success && res.demandes) {
          const mapped = res.demandes.map((d: any) => ({
            id: d.id,
            dossier_number: d.dossier_number,
            status: d.status,
            created_at: d.created_at,
            project: {
              loanType: d.loan_type,
              purpose: d.personal_data?.purpose || '',
              amount: d.amount,
              duration: d.duration,
              neededBy: d.personal_data?.neededBy || '',
            },
            personal: {
              civility: d.personal_data?.civility || '',
              firstName: d.personal_data?.firstName || d.profiles?.first_name || '',
              lastName: d.personal_data?.lastName || d.profiles?.last_name || '',
              birthDate: d.personal_data?.birthDate || '',
              nationality: d.personal_data?.nationality || '',
              maritalStatus: d.personal_data?.maritalStatus || '',
              dependents: d.personal_data?.dependents || 0,
              address: d.personal_data?.address || d.profiles?.address || '',
              zipCode: d.personal_data?.zipCode || d.profiles?.postal_code || '',
              city: d.personal_data?.city || d.profiles?.city || '',
              email: d.personal_data?.email || '',
              phone: d.personal_data?.phone || d.profiles?.phone || '',
            },
            financial: {
              professionalStatus: d.personal_data?.professionalStatus || '',
              employer: d.personal_data?.employer || '',
              seniority: d.personal_data?.seniority || '',
              monthlyIncome: d.personal_data?.monthlyIncome || 0,
              otherIncome: d.personal_data?.otherIncome || 0,
              monthlyCharges: d.personal_data?.monthlyCharges || 0,
              existingCredits: d.personal_data?.existingCredits || 0,
              savings: d.personal_data?.savings || 0,
              housingStatus: d.personal_data?.housingStatus || '',
            },
            documents: d.documents || [],
            consents: {
              cgu: d.personal_data?.consentCGU || false,
              privacy: d.personal_data?.consentPrivacy || false,
              accuracy: d.personal_data?.consentAccuracy || false,
              processing: d.personal_data?.consentProcessing || false,
              marketing: d.personal_data?.consentMarketing || false,
            },
            notes: d.notes,
            assigned_advisor: d.assigned_advisor,
          }))
          setDemandes(mapped)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredDemandes = demandes.filter((d) => {
    const matchesStatus = filterStatus === 'all' || d.status === filterStatus
    const matchesSearch = searchQuery === '' ||
      `${d.personal.firstName} ${d.personal.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.dossier_number.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  async function handleStatusChange(id: string, newStatus: string, notes?: string) {
    try {
      const res = await updateDemandeStatus(id, newStatus, notes);
      if (res.success) {
        setDemandes((prev) => prev.map((d) => d.id === id ? { ...d, status: newStatus as DemoStatus, notes } : d))
        setSelectedDemande(null)
      } else {
        alert("Erreur lors de la mise à jour : " + res.error);
      }
    } catch (e) {
      console.error(e);
      alert("Erreur de connexion avec le serveur.");
    }
  }

  async function handleReclamation(id: string, notes: string) {
    try {
      if (!notes) {
        alert("Veuillez saisir dans 'Notes internes' les pièces demandées avant de cliquer.");
        return;
      }
      const demande = demandes.find((d) => d.id === id);
      if (!demande) return;

      const res = await requestMissingDocuments(id, demande.personal.email, demande.personal.firstName, demande.dossier_number, notes);
      if (res.success) {
        alert("Mail de demande de documents expédié avec succès à " + demande.personal.email);
        setDemandes((prev) => prev.map((d) => d.id === id ? { ...d, notes } : d));
      } else {
        alert("Erreur lors de l'envoi : " + res.error);
      }
    } catch (e) {
      console.error(e);
      alert("Erreur serveur lors de la demande de pièces.");
    }
  }

  if (loading) {
    return <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chargement des données...</div>
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Demandes de financement
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          {demandes.length} demandes au total — {demandes.filter(d => d.status === 'pending').length} en attente
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
          <Search size={18} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Rechercher par nom ou n° dossier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <Filter size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ paddingLeft: '2.5rem', minWidth: '180px' }}
          >
            <option value="all">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="processing">En traitement</option>
            <option value="approved">Approuvé</option>
            <option value="rejected">Rejeté</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div style={{ 
        padding: 0, 
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
        borderRadius: 'var(--radius-xl)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>N° Dossier</th>
                <th>Type de prêt</th>
                <th>Montant</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDemandes.map((d) => {
                const sc = statusConfig[d.status]
                return (
                  <tr key={d.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedDemande(d)}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '38px', height: '38px', borderRadius: '50%',
                          background: 'var(--color-primary)', display: 'flex',
                          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          fontSize: '0.8rem', fontWeight: 700, color: 'white',
                        }}>
                          {d.personal.firstName[0]}{d.personal.lastName[0]}
                        </div>
                        <div>
                          <span style={{ fontWeight: 600, fontSize: '0.9rem', display: 'block' }}>
                            {d.personal.firstName} {d.personal.lastName}
                          </span>
                          <span style={{ fontSize: '0.775rem', color: 'var(--color-text-muted)', display: 'block' }}>{d.personal.city}</span>
                          <a href={`mailto:${d.personal.email}`} onClick={e => e.stopPropagation()} style={{ fontSize: '0.75rem', color: 'var(--color-info)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem', textDecoration: 'none', fontWeight: 500 }}>
                            <Mail size={10} />
                            {d.personal.email || "Non renseigné"}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      {d.dossier_number}
                    </td>
                    <td>{d.project.loanType}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      {d.project.amount.toLocaleString('fr-FR')} €
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      {new Date(d.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                        padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)',
                        fontSize: '0.775rem', fontWeight: 600,
                        color: sc.color, background: sc.bg,
                        border: `1px solid ${sc.border}`,
                      }}>
                        {sc.label}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedDemande(d); }}
                        style={{
                          background: 'none', border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)', padding: '0.375rem 0.75rem',
                          cursor: 'pointer', fontSize: '0.8rem', display: 'flex',
                          alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-body)',
                          color: 'var(--color-primary-light)',
                        }}
                      >
                        <Eye size={14} /> Détails
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredDemandes.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
            <FileText size={48} style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
            <p style={{ fontWeight: 600 }}>Aucune demande trouvée</p>
            <p style={{ fontSize: '0.875rem' }}>Modifiez vos filtres pour voir plus de résultats.</p>
          </div>
        )}
      </div>

      {/* Detail Panel Overlay */}
      <AnimatePresence>
        {selectedDemande && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDemande(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.4)',
                zIndex: 1150,
              }}
            />
            <DetailPanel
              demande={selectedDemande}
              onClose={() => setSelectedDemande(null)}
              onStatusChange={handleStatusChange}
              onReclamation={handleReclamation}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
