import {jwtDecode} from 'jwt-decode';

// Hàm để kiểm tra token và gọi hàm đăng xuất nếu token hết hạn
const checkTokenAndLogout = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    localStorage.clear();
    return;
  }
  
  try {
    const decodedToken = jwtDecode(token);
    const expiryTime = decodedToken.exp * 1000; // Thời gian hết hạn được trả về theo giây, chuyển đổi sang milliseconds

    if (new Date().getTime() > expiryTime) {
      localStorage.clear();
    }
  } catch (error) {
    localStorage.clear();
  }
};

const startTokenCheck = () => {
  setInterval(() => {
    checkTokenAndLogout();
    window.location.reload();
  }, 60000);
};
startTokenCheck();