import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const THEMES = [
  { id: 'default', name: 'Classic', colors: ['#000', '#000'] },
  { id: 'purple-yellow', name: 'Purple & Yellow', colors: ['#7c3aed', '#eab308'] },
  { id: 'green-blue', name: 'Green & Blue', colors: ['#10b981', '#3b82f6'] },
  { id: 'red-orange', name: 'Red & Orange', colors: ['#ef4444', '#f97316'] },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'default';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);

    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
