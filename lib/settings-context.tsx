'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  SettingsState, 
  UserProfile, 
  AppSettings, 
  DEFAULT_SETTINGS, 
  DEFAULT_USER,
  CurrencySettings 
} from './settings-types';

// Action types
type SettingsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | undefined }
  | { type: 'UPDATE_USER'; payload: Partial<UserProfile> }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  | { type: 'SET_CURRENCY'; payload: CurrencySettings }
  | { type: 'RESET_SETTINGS' }
  | { type: 'LOAD_SETTINGS'; payload: { user: UserProfile; settings: AppSettings } };

// Initial state
const initialState: SettingsState = {
  user: DEFAULT_USER,
  settings: DEFAULT_SETTINGS,
  isLoading: false,
  error: undefined
};

// Reducer
function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload, updatedAt: new Date().toISOString() }
      };
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };
    
    case 'SET_CURRENCY':
      return {
        ...state,
        settings: { ...state.settings, currency: action.payload }
      };
    
    case 'LOAD_SETTINGS':
      return {
        ...state,
        user: action.payload.user,
        settings: action.payload.settings,
        isLoading: false,
        error: undefined
      };
    
    case 'RESET_SETTINGS':
      return {
        ...state,
        user: DEFAULT_USER,
        settings: DEFAULT_SETTINGS,
        error: undefined
      };
    
    default:
      return state;
  }
}

// Context
const SettingsContext = createContext<{
  state: SettingsState;
  dispatch: React.Dispatch<SettingsAction>;
  updateUser: (user: Partial<UserProfile>) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  setCurrency: (currency: CurrencySettings) => void;
  resetSettings: () => void;
} | null>(null);

// Provider component
export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedUser = localStorage.getItem('loan-dashboard-user');
        const savedSettings = localStorage.getItem('loan-dashboard-settings');
        
        if (savedUser && savedSettings) {
          const user = JSON.parse(savedUser);
          const settings = JSON.parse(savedSettings);
          dispatch({ type: 'LOAD_SETTINGS', payload: { user, settings } });
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load settings' });
      }
    };

    loadSettings();
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('loan-dashboard-user', JSON.stringify(state.user));
      localStorage.setItem('loan-dashboard-settings', JSON.stringify(state.settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, [state.user, state.settings]);

  // Action creators
  const updateUser = (user: Partial<UserProfile>) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const updateSettings = (settings: Partial<AppSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const setCurrency = (currency: CurrencySettings) => {
    dispatch({ type: 'SET_CURRENCY', payload: currency });
  };

  const resetSettings = () => {
    dispatch({ type: 'RESET_SETTINGS' });
  };

  return (
    <SettingsContext.Provider
      value={{
        state,
        dispatch,
        updateUser,
        updateSettings,
        setCurrency,
        resetSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// Hook to use settings
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

// Hook to get current currency
export function useCurrency() {
  const { state } = useSettings();
  return state.settings.currency;
}

// Hook to get current user
export function useUser() {
  const { state } = useSettings();
  return state.user;
}
