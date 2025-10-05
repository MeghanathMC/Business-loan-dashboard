import { CurrencySettings } from './settings-types';

/**
 * Formats a number as currency using the provided currency settings
 */
export function formatCurrency(
  value: number, 
  currency: CurrencySettings,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showSymbol?: boolean;
  }
): string {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    showSymbol = true
  } = options || {};

  const formatter = new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits,
    maximumFractionDigits,
  });

  if (!showSymbol) {
    // Return just the number without currency symbol
    return new Intl.NumberFormat(currency.locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(value);
  }

  return formatter.format(value);
}

/**
 * Formats a number as currency with compact notation (K, M, B)
 */
export function formatCurrencyCompact(
  value: number,
  currency: CurrencySettings,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  const {
    minimumFractionDigits = 1,
    maximumFractionDigits = 1
  } = options || {};

  const formatter = new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    notation: 'compact',
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return formatter.format(value);
}

/**
 * Formats a number as percentage
 */
export function formatPercentage(
  value: number,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  const {
    minimumFractionDigits = 1,
    maximumFractionDigits = 1
  } = options || {};

  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value / 100);
}

/**
 * Formats a number with thousand separators
 */
export function formatNumber(
  value: number,
  locale: string = 'en-US',
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 0
  } = options || {};

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

/**
 * Gets currency symbol for display
 */
export function getCurrencySymbol(currency: CurrencySettings): string {
  return currency.symbol;
}

/**
 * Converts currency code to display name
 */
export function getCurrencyName(currency: CurrencySettings): string {
  return currency.name;
}
