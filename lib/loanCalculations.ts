/**
 * Loan calculation utilities for FinancePro
 * Standard French consumer credit formulas
 */

/**
 * Calculate monthly payment (mensualité)
 * Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  months: number
): number {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  const numerator = r * Math.pow(1 + r, months);
  const denominator = Math.pow(1 + r, months) - 1;
  return principal * (numerator / denominator);
}

/**
 * Calculate TAEG (Annual Percentage Rate - approximation for display)
 * Adds estimated insurance and fees
 */
export function calculateTAEG(
  annualRate: number,
  loanType: string,
  months: number,
  amount: number
): number {
  // Base rate adjustments per loan type
  const adjustments: Record<string, number> = {
    personnel: 0.48,
    immobilier: 0.12,
    professionnel: 0.55,
    rachat: 0.50,
    travaux: 0.40,
    auto: 0.45,
  };

  const adjustment = adjustments[loanType] || 0.45;
  let taeg = annualRate + adjustment;

  // Small loans have higher effective rates
  if (amount < 5000) taeg += 0.5;
  // Longer terms have slightly higher rates
  if (months > 84) taeg += 0.15;

  return Math.round(taeg * 100) / 100;
}

/**
 * Get indicative rate based on loan type
 */
export function getIndicativeRate(loanType: string, months: number, amount: number): number {
  const baseRates: Record<string, number> = {
    personnel: 5.5,
    immobilier: 3.4,
    professionnel: 4.8,
    rachat: 4.2,
    travaux: 4.9,
    auto: 4.5,
  };

  let rate = baseRates[loanType] || 5.5;

  // Short term penalty
  if (months <= 24) rate += 0.5;
  // High amount discount
  if (amount >= 20000) rate -= 0.3;
  if (amount >= 50000) rate -= 0.5;

  return Math.max(1.0, Math.round(rate * 100) / 100);
}

/**
 * Calculate total cost of credit
 */
export function calculateTotalCost(monthly: number, months: number, principal: number): number {
  return Math.round((monthly * months - principal) * 100) / 100;
}

/**
 * Calculate total amount due
 */
export function calculateTotalDue(monthly: number, months: number): number {
  return Math.round(monthly * months * 100) / 100;
}

/**
 * Calculate debt ratio (taux d'endettement)
 */
export function calculateDebtRatio(
  monthlyPayment: number,
  existingCharges: number,
  income: number
): number {
  if (income === 0) return 0;
  return Math.round(((monthlyPayment + existingCharges) / income) * 100 * 10) / 10;
}

/**
 * Generate amortization table
 */
export interface AmortizationRow {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  remaining: number;
}

export function generateAmortizationTable(
  principal: number,
  annualRate: number,
  months: number,
  maxRows?: number
): AmortizationRow[] {
  const r = annualRate / 100 / 12;
  const monthly = calculateMonthlyPayment(principal, annualRate, months);
  const rows: AmortizationRow[] = [];
  let remaining = principal;

  const limit = maxRows ? Math.min(months, maxRows) : months;

  for (let i = 1; i <= limit; i++) {
    const interest = remaining * r;
    const principalPart = monthly - interest;
    remaining = Math.max(0, remaining - principalPart);

    rows.push({
      month: i,
      payment: Math.round(monthly * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      principal: Math.round(principalPart * 100) / 100,
      remaining: Math.round(remaining * 100) / 100,
    });
  }

  return rows;
}

/**
 * Calculate eligibility score (visual indicator)
 */
export function calculateEligibilityScore(
  income: number,
  monthlyPayment: number,
  existingCharges: number,
  status: string
): number {
  const debtRatio = calculateDebtRatio(monthlyPayment, existingCharges, income);

  let score = 100;

  // Debt ratio impact
  if (debtRatio > 35) score -= Math.min(60, (debtRatio - 35) * 4);
  else if (debtRatio > 28) score -= (debtRatio - 28) * 2;

  // Professional status impact
  const statusScores: Record<string, number> = {
    cdi: 0,
    fonctionnaire: 0,
    cdd: -10,
    independant: -15,
    retraite: -5,
    "sans-emploi": -40,
  };
  score += statusScores[status] || 0;

  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format number with French locale
 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n);
}
