export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'business_analyst' | 'senior_analyst' | 'loan_officer' | 'manager' | 'admin';
  department?: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CurrencySettings {
  code: string;
  symbol: string;
  locale: string;
  name: string;
}

export interface AppSettings {
  currency: CurrencySettings;
  theme: 'light' | 'dark' | 'system';
  language: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

export interface SettingsState {
  user: UserProfile;
  settings: AppSettings;
  isLoading: boolean;
  error?: string;
}

// Available currencies
export const AVAILABLE_CURRENCIES: CurrencySettings[] = [
  {
    code: 'USD',
    symbol: '$',
    locale: 'en-US',
    name: 'US Dollar'
  },
  {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
    name: 'Indian Rupee'
  },
  {
    code: 'EUR',
    symbol: '€',
    locale: 'en-EU',
    name: 'Euro'
  },
  {
    code: 'GBP',
    symbol: '£',
    locale: 'en-GB',
    name: 'British Pound'
  },
  {
    code: 'CAD',
    symbol: 'C$',
    locale: 'en-CA',
    name: 'Canadian Dollar'
  },
  {
    code: 'AUD',
    symbol: 'A$',
    locale: 'en-AU',
    name: 'Australian Dollar'
  },
  {
    code: 'JPY',
    symbol: '¥',
    locale: 'ja-JP',
    name: 'Japanese Yen'
  },
  {
    code: 'CNY',
    symbol: '¥',
    locale: 'zh-CN',
    name: 'Chinese Yuan'
  },
  {
    code: 'SGD',
    symbol: 'S$',
    locale: 'en-SG',
    name: 'Singapore Dollar'
  },
  {
    code: 'AED',
    symbol: 'د.إ',
    locale: 'ar-AE',
    name: 'UAE Dirham'
  }
];

// Available roles
export const AVAILABLE_ROLES = [
  { value: 'business_analyst', label: 'Business Analyst' },
  { value: 'senior_analyst', label: 'Senior Analyst' },
  { value: 'loan_officer', label: 'Loan Officer' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Administrator' }
] as const;

// Default settings
export const DEFAULT_SETTINGS: AppSettings = {
  currency: AVAILABLE_CURRENCIES[0], // USD
  theme: 'system',
  language: 'en',
  dateFormat: 'MM/dd/yyyy',
  timeFormat: '12h',
  notifications: {
    email: true,
    push: true,
    sms: false
  }
};

// Default user profile
export const DEFAULT_USER: UserProfile = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'business_analyst',
  department: 'Credit Analysis',
  phone: '+1 (555) 123-4567',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
