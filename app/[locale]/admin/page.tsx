'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FileText,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  DollarSign,
} from 'lucide-react'
import { getAdminStats, getAllDemandes } from '@/app/admin/actions'

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'En attente', color: '#D97706', bg: 'rgba(245,158,11,0.1)' },
  processing: { label: 'En traitement', color: '#2563EB', bg: 'rgba(59,130,246,0.1)' },
  approved: { label: 'Approuvé', color: '#059669', bg: 'rgba(0,200,150,0.1)' },
  rejected: { label: 'Rejeté', color: '#DC2626', bg: 'rgba(220,38,38,0.1)' },
  cancelled: { label: 'Annulé', color: '#6B7280', bg: 'rgba(107, 114, 128, 0.1)' },
}

export default function AdminDashboardPage() {
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'fr'

  const [stats, setStats] = useState([
    { label: 'Total demandes', value: '0', icon: FileText, color: 'var(--color-primary-light)', change: '' },
    { label: 'En attente', value: '0', icon: Clock, color: '#D97706', change: '' },
    { label: 'Approuvées', value: '0', icon: CheckCircle, color: 'var(--color-accent)', change: '' },
    { label: 'Montant total', value: '0 €', icon: DollarSign, color: '#8B5CF6', change: '' },
  ])
  const [recentDemandes, setRecentDemandes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const statsRes = await getAdminStats()
        if (statsRes.success) {
          setStats([
            { label: 'Total demandes', value: statsRes.total?.toString() || '0', icon: FileText, color: 'var(--color-primary-light)', change: '' },
            { label: 'En attente', value: statsRes.pending?.toString() || '0', icon: Clock, color: '#D97706', change: '' },
            { label: 'Approuvées', value: statsRes.approved?.toString() || '0', icon: CheckCircle, color: 'var(--color-accent)', change: '' },
            { label: 'Montant total', value: `${(statsRes.totalAmount || 0).toLocaleString('fr-FR')} €`, icon: DollarSign, color: '#8B5CF6', change: '' },
          ])
        }

        const demandesRes = await getAllDemandes()
        if (demandesRes.success && demandesRes.demandes) {
          setRecentDemandes(demandesRes.demandes.slice(0, 5))
        }
      } catch (error) {
        console.error('Failed to fetch admin data', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chargement des données...</div>
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Tableau de bord
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          Vue d&apos;ensemble de l&apos;activité FinancePro
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {stats.map(({ label, value, icon: Icon, color, change }) => (
          <div
            key={label}
            style={{ 
              padding: '1.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.75rem',
              background: 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{label}</span>
              <div style={{
                width: '40px', height: '40px', borderRadius: 'var(--radius-md)',
                background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={20} style={{ color }} />
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text)' }}>
              {value}
            </div>
            {change && <span style={{ fontSize: '0.775rem', color, fontWeight: 500 }}>{change}</span>}
          </div>
        ))}
      </div>

      {/* Recent demands */}
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
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: 700 }}>
            Dernières demandes
          </h2>
          <Link
            href={`/${locale}/admin/demandes`}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary-light)',
              textDecoration: 'none',
            }}
          >
            Voir tout
            <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ fontSize: '0.9rem' }}>
            <thead>
              <tr>
                 <th>Client</th>
                 <th>Type de prêt</th>
                 <th>Montant</th>
                 <th>Date</th>
                 <th>Statut</th>
               </tr>
             </thead>
             <tbody>
               {recentDemandes.map((d) => {
                 const sc = statusConfig[d.status] || { label: d.status, color: '#333', bg: '#eee' }
                 const profile = d.profiles || d.personal_data || {}
                 const clientName = `${profile.first_name || profile.firstName || ''} ${profile.last_name || profile.lastName || ''}`

                 return (
                   <tr key={d.id}>
                     <td>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                         <div style={{
                           width: '36px', height: '36px', borderRadius: '50%',
                           background: 'var(--color-primary)', display: 'flex',
                           alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                         }}>
                           <Users size={16} color="white" />
                         </div>
                         <span style={{ fontWeight: 600 }}>{clientName.trim() || 'Inconnu'}</span>
                       </div>
                     </td>
                     <td>{d.loan_type}</td>
                     <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{Number(d.amount).toLocaleString('fr-FR')} €</td>
                     <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>{new Date(d.created_at).toLocaleDateString('fr-FR')}</td>
                     <td>
                       <span style={{
                         display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                         padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)',
                         fontSize: '0.775rem', fontWeight: 600,
                         color: sc.color, background: sc.bg,
                         border: `1px solid ${sc.color}30`,
                       }}>
                         {sc.label}
                       </span>
                     </td>
                   </tr>
                 )
               })}
             </tbody>
           </table>
           {recentDemandes.length === 0 && (
             <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
               Aucune demande récente.
             </div>
           )}
         </div>
       </div>
     </div>
   )
}
