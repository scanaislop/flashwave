import React, { createContext, useContext } from 'react';

// Define theme colors for dark mode only
export interface ThemeColors {
  background: string;
  backgroundGradient: [string, string]; // Tuple type for exactly two colors
  text: string;
  subtext: string;
  primary: string;
  secondary: string;
  accent: string;
  warning: string;
  border: string;
  cardBackground: string;
}

// Define dark theme colors
export const darkTheme: ThemeColors = {
  background: '#0A0A0F',
  backgroundGradient: ['#0A0A0F', '#1A1A2E'],
  text: '#FFFFFF',
  subtext: '#ADB5BD',
  primary: '#06FFA5',
  secondary: '#8B5CF6',
  accent: '#3B82F6',
  warning: '#F59E0B',
  border: '#8B5CF680',
  cardBackground: '#1A1A2E',
};

// Define theme context for dark mode only
interface ThemeContextType {
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always use dark theme
  const colors = darkTheme;

  const value = {
    colors,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
