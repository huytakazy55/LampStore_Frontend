import { createContext, useState, useEffect } from 'react';

// Tạo context để quản lý theme
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeColors, setThemeColors] = useState({
    StartColorLinear: 'rgba(136,70,249,1)',
    EndColorLinear: 'rgba(255,175,0,1)'
  });

  // Lấy màu từ localStorage nếu có
  useEffect(() => {
    const savedColors = localStorage.getItem('themeColors') ? JSON.parse(localStorage.getItem('themeColors')) : null;
    if (savedColors) {
      setThemeColors(savedColors);
    }
  }, []);

  // Hàm thay đổi màu và lưu vào localStorage
  const changeTheme = (colors) => {
    if (typeof colors === 'object') {  // Đảm bảo 'colors' là object
      setThemeColors(colors);
      localStorage.setItem('themeColors', JSON.stringify(colors)); // Sửa lỗi tại đây
    } else {
      console.error('Invalid colors object', colors);
    }
  };

  return (
    <ThemeContext.Provider value={{ themeColors, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};