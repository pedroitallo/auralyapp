import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@/api/entities';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const user = await User.me();
      if (user?.theme_preference) {
        setTheme(user.theme_preference);
        applyTheme(user.theme_preference);
      } else {
        applyTheme('dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
      applyTheme('dark');
    } finally {
      setLoading(false);
    }
  };

  const applyTheme = (newTheme) => {
    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('users')
          .update({ theme_preference: newTheme })
          .eq('email', user.email);
      }
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};
