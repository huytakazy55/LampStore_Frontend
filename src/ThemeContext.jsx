import { createContext, useState, useEffect, useContext } from 'react';

// Tạo context để quản lý theme
export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) =>
{
  const [themeColors, setThemeColors] = useState({
    StartColorLinear: 'rgba(136,70,249,1)',
    EndColorLinear: 'rgba(255,175,0,1)'
  });

  // Dark mode state — check localStorage or system preference
  const [isDark, setIsDark] = useState(() =>
  {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return false; // Default: light mode
  });

  // Apply dark class to <html>
  useEffect(() =>
  {
    const root = document.documentElement;
    if (isDark)
    {
      root.classList.add('dark');
    } else
    {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDark);
  }, [isDark]);

  // Lấy màu từ localStorage nếu có
  useEffect(() =>
  {
    const savedColors = localStorage.getItem('themeColors') ? JSON.parse(localStorage.getItem('themeColors')) : null;
    if (savedColors)
    {
      setThemeColors(savedColors);
    }
  }, []);

  // Hàm thay đổi màu và lưu vào localStorage
  const changeTheme = (colors) =>
  {
    if (typeof colors === 'object')
    {
      setThemeColors(colors);
      localStorage.setItem('themeColors', JSON.stringify(colors));
    } else
    {
      console.error('Invalid colors object', colors);
    }
  };

  const toggleDarkMode = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ themeColors, changeTheme, isDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};