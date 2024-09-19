import { createContext, useState, useEffect } from 'react';

// Tạo context để quản lý theme
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState('#ffffff');

  // Lấy màu từ localStorage nếu có
  useEffect(() => {
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
      setThemeColor(savedColor);
    }
  }, []);

  // Hàm thay đổi màu và lưu vào localStorage
  const changeTheme = (color) => {
    setThemeColor(color);
    localStorage.setItem('themeColor', color);
  };

  return (
    <ThemeContext.Provider value={{ themeColor, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};