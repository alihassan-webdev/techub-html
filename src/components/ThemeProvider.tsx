import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeColors {
  primary: string;
  accent: string;
  background: string;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: ThemeColors;
  updateColors: (colors: Partial<ThemeColors>) => void;
}

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
  colors: {
    primary: '213 94% 18%',
    accent: '142 76% 20%',
    background: '0 0% 100%'
  },
  updateColors: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'tech-hub-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  
  const [colors, setColors] = useState<ThemeColors>(initialState.colors);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const updateColors = (newColors: Partial<ThemeColors>) => {
    const updatedColors = { ...colors, ...newColors };
    setColors(updatedColors);
    
    // Update CSS custom properties
    const root = window.document.documentElement;
    if (newColors.primary) {
      root.style.setProperty('--primary', newColors.primary);
    }
    if (newColors.accent) {
      root.style.setProperty('--accent', newColors.accent);
    }
    if (newColors.background) {
      root.style.setProperty('--background', newColors.background);
    }
  };

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    colors,
    updateColors,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};