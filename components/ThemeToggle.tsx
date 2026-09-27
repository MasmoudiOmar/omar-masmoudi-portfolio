import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/** Stored choice wins; otherwise follow the OS. */
export const resolveTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // Private mode and blocked storage both throw; fall through to the OS.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const apply = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof window === 'undefined' ? 'light' : resolveTheme(),
  );

  useEffect(() => {
    apply(theme);
  }, [theme]);

  // Follow the OS while the visitor hasn't expressed a preference of their own.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        // Unreadable storage means no stored choice to respect.
      }
      setTheme(event.matches ? 'dark' : 'light');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The toggle still works for this session if we can't persist it.
    }
  };

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="relative w-9 h-9 rounded-full border border-line text-muted hover:text-ink hover:border-faint transition-colors flex items-center justify-center overflow-hidden"
    >
      <Sun
        className={`absolute w-4 h-4 transition-all duration-500 ${
          isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
        }`}
      />
      <Moon
        className={`absolute w-4 h-4 transition-all duration-500 ${
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
