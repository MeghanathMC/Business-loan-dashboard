export interface Applicant {
  id: string;
  business_name: string;
  business_type: string;
  tax_id: string;
  years_in_business: number;
  industry: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface LoanApplication {
  id: string;
  applicant_id: string;
  loan_amount: number;
  loan_purpose: string;
  loan_term_months: number;
  collateral_type?: string;
  collateral_value: number;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'more_info_needed';
  assigned_analyst_id?: string;
  submission_date: string;
  review_date?: string;
  decision_date?: string;
  created_at: string;
  updated_at: string;
  applicant?: Applicant;
  financial_metrics?: FinancialMetrics;
  risk_alerts?: RiskAlert[];
}

export interface FinancialMetrics {
  id: string;
  applicant_id: string;
  metric_date: string;
  annual_revenue: number;
  net_profit: number;
  total_assets: number;
  total_liabilities: number;
  current_assets: number;
  current_liabilities: number;
  cash_flow: number;
  credit_score: number;
  debt_to_income_ratio: number;
  debt_to_equity_ratio: number;
  current_ratio: number;
  created_at: string;
}

export interface EligibilityCriteria {
  id: string;
  name: string;
  description?: string;
  criteria_type: string;
  min_threshold?: number;
  max_threshold?: number;
  weight: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApplicationScore {
  id: string;
  application_id: string;
  criteria_id: string;
  score: number;
  calculated_at: string;
  criteria?: EligibilityCriteria;
}

export interface AnalystNote {
  id: string;
  application_id: string;
  analyst_id: string;
  note_type: 'comment' | 'flag' | 'recommendation';
  content: string;
  is_internal: boolean;
  created_at: string;
}

export interface RiskAlert {
  id: string;
  application_id: string;
  alert_type: 'high_risk' | 'compliance' | 'verification_needed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  is_resolved: boolean;
  created_at: string;
  resolved_at?: string;
}
