import { LoanApplication, FinancialMetrics, EligibilityCriteria } from './types';

export interface CriteriaScore {
  criteria: EligibilityCriteria;
  value: number;
  passes: boolean;
  weightedScore: number;
}

export interface EligibilityResult {
  overallScore: number;
  maxScore: number;
  scorePercentage: number;
  recommendation: 'approve' | 'review' | 'reject';
  criteriaScores: CriteriaScore[];
  passedCriteria: number;
  totalCriteria: number;
}

export function calculateEligibility(
  application: LoanApplication,
  metrics: FinancialMetrics,
  criteria: EligibilityCriteria[]
): EligibilityResult {
  const activeCriteria = criteria.filter(c => c.is_active);
  const criteriaScores: CriteriaScore[] = [];

  let totalWeightedScore = 0;
  let maxPossibleScore = 0;
  let passedCount = 0;

  activeCriteria.forEach(criterion => {
    const score = evaluateCriterion(criterion, application, metrics);
    criteriaScores.push(score);

    totalWeightedScore += score.weightedScore;
    maxPossibleScore += criterion.weight * 100;

    if (score.passes) {
      passedCount++;
    }
  });

  const scorePercentage = maxPossibleScore > 0 ? (totalWeightedScore / maxPossibleScore) * 100 : 0;

  let recommendation: 'approve' | 'review' | 'reject';
  if (scorePercentage >= 75 && passedCount === activeCriteria.length) {
    recommendation = 'approve';
  } else if (scorePercentage >= 50 || passedCount >= activeCriteria.length * 0.7) {
    recommendation = 'review';
  } else {
    recommendation = 'reject';
  }

  return {
    overallScore: totalWeightedScore,
    maxScore: maxPossibleScore,
    scorePercentage: Math.round(scorePercentage * 10) / 10,
    recommendation,
    criteriaScores,
    passedCriteria: passedCount,
    totalCriteria: activeCriteria.length,
  };
}

function evaluateCriterion(
  criterion: EligibilityCriteria,
  application: LoanApplication,
  metrics: FinancialMetrics
): CriteriaScore {
  let value = 0;

  switch (criterion.criteria_type) {
    case 'credit_score':
      value = metrics.credit_score;
      break;
    case 'debt_to_income_ratio':
      value = metrics.debt_to_income_ratio;
      break;
    case 'current_ratio':
      value = metrics.current_ratio;
      break;
    case 'years_in_business':
      value = application.applicant?.years_in_business || 0;
      break;
    case 'annual_revenue':
      value = metrics.annual_revenue;
      break;
    case 'debt_to_equity_ratio':
      value = metrics.debt_to_equity_ratio;
      break;
    case 'cash_flow':
      value = metrics.cash_flow;
      break;
    case 'collateral_coverage':
      value = application.collateral_value / application.loan_amount;
      break;
    default:
      value = 0;
  }

  const passes = checkThreshold(value, criterion);
  const normalizedScore = calculateNormalizedScore(value, criterion);
  const weightedScore = normalizedScore * criterion.weight;

  return {
    criteria: criterion,
    value,
    passes,
    weightedScore,
  };
}

function checkThreshold(value: number, criterion: EligibilityCriteria): boolean {
  const { min_threshold, max_threshold } = criterion;

  if (min_threshold !== undefined && max_threshold !== undefined) {
    return value >= min_threshold && value <= max_threshold;
  } else if (min_threshold !== undefined) {
    return value >= min_threshold;
  } else if (max_threshold !== undefined) {
    return value <= max_threshold;
  }

  return true;
}

function calculateNormalizedScore(value: number, criterion: EligibilityCriteria): number {
  const { min_threshold, max_threshold, criteria_type } = criterion;

  const isInverseMetric = ['debt_to_income_ratio', 'debt_to_equity_ratio'].includes(criteria_type);

  if (min_threshold !== undefined && max_threshold !== undefined) {
    if (isInverseMetric) {
      if (value <= min_threshold) return 100;
      if (value >= max_threshold) return 0;
      return ((max_threshold - value) / (max_threshold - min_threshold)) * 100;
    } else {
      if (value >= max_threshold) return 100;
      if (value <= min_threshold) return 0;
      return ((value - min_threshold) / (max_threshold - min_threshold)) * 100;
    }
  } else if (min_threshold !== undefined) {
    if (value >= min_threshold * 1.5) return 100;
    if (value <= min_threshold) return 0;
    return ((value - min_threshold) / (min_threshold * 0.5)) * 100;
  } else if (max_threshold !== undefined) {
    if (value <= max_threshold * 0.5) return 100;
    if (value >= max_threshold) return 0;
    return ((max_threshold - value) / (max_threshold * 0.5)) * 100;
  }

  return 100;
}

// This function is deprecated - use formatCurrency from currency-utils.ts instead
// Keeping for backward compatibility
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatRatio(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}
