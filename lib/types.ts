/**
 * TypeScript types for FinancePro
 * Database models & shared interfaces
 */

// ─── Profile (extension of auth.users) ──────────────────────────────────────
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  country: string;
  created_at: string;
  updated_at: string;
}

// ─── Loan Application ───────────────────────────────────────────────────────
export type LoanStatus = 'pending' | 'processing' | 'approved' | 'rejected' | 'cancelled';

export interface PersonalData {
  civility: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  maritalStatus: string;
  dependents: number;
  address: string;
  zipCode: string;
  city: string;
  email: string;
  phone: string;
}

export interface FinancialData {
  professionalStatus: string;
  employer: string;
  seniority: string;
  monthlyIncome: number;
  otherIncome: number;
  monthlyCharges: number;
  existingCredits: number;
  savings: number;
  housingStatus: string;
}

export interface ProjectData {
  loanType: string;
  purpose: string;
  amount: number;
  duration: number;
  neededBy: string;
}

export interface DocumentInfo {
  id: string;
  name: string;
  label: string;
  url: string;
  type: string;
  size: number;
  uploaded_at: string;
}

export interface LoanApplication {
  id: string;
  user_id: string;
  dossier_number: string;
  simulation_id: string | null;
  loan_type: string;
  amount: number;
  duration: number;
  status: LoanStatus;
  personal_data: PersonalData & FinancialData & ProjectData;
  documents: DocumentInfo[];
  notes: string | null;
  assigned_advisor: string | null;
  created_at: string;
  updated_at: string;
}

// Jointure avec profile
export interface LoanApplicationWithProfile extends LoanApplication {
  profiles: Profile;
}

// ─── Simulation ─────────────────────────────────────────────────────────────
export interface Simulation {
  id: string;
  user_id: string | null;
  loan_type: string;
  amount: number;
  duration: number;
  rate: number;
  monthly_payment: number;
  total_cost: number;
  taeg: number | null;
  debt_ratio: number | null;
  professional_status: string | null;
  income: number | null;
  charges: number | null;
  created_at: string;
}

// ─── Contact Messages ───────────────────────────────────────────────────────
export interface ContactMessage {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  responded_at: string | null;
  created_at: string;
}

// ─── Admin Types ────────────────────────────────────────────────────────────
export interface AdminSession {
  isAdmin: boolean;
  loginTime: number;
}

// ─── Status badge config ────────────────────────────────────────────────────
export const STATUS_CONFIG: Record<LoanStatus, { label: string; labelEs: string; color: string; bg: string; border: string }> = {
  pending: {
    label: 'En attente',
    labelEs: 'Pendiente',
    color: '#D97706',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.3)',
  },
  processing: {
    label: 'En traitement',
    labelEs: 'En proceso',
    color: '#2563EB',
    bg: 'rgba(59, 130, 246, 0.1)',
    border: 'rgba(59, 130, 246, 0.3)',
  },
  approved: {
    label: 'Approuvé',
    labelEs: 'Aprobado',
    color: '#059669',
    bg: 'rgba(0, 200, 150, 0.1)',
    border: 'rgba(0, 200, 150, 0.3)',
  },
  rejected: {
    label: 'Rejeté',
    labelEs: 'Rechazado',
    color: '#DC2626',
    bg: 'rgba(220, 38, 38, 0.1)',
    border: 'rgba(220, 38, 38, 0.3)',
  },
  cancelled: {
    label: 'Annulé',
    labelEs: 'Cancelado',
    color: '#6B7280',
    bg: 'rgba(107, 114, 128, 0.1)',
    border: 'rgba(107, 114, 128, 0.3)',
  },
};
