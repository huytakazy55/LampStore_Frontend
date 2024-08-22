import {jwtDecode} from 'jwt-decode';

// Hàm để kiểm tra token và gọi hàm đăng xuất nếu token hết hạn
const checkTokenAndLogout = () => {
  const token = localStorage.getItem('token'); 

  if (!token) {
    localStorage.clear();
    window.location.href = '/'; // Redirect tới trang login nếu token không tồn tại
    return;
  }

  try {
    const decodedToken = jwtDecode(token);
    const expiryTime = decodedToken.exp * 1000; // Thời gian hết hạn được trả về theo giây, chuyển đổi sang milliseconds
    if (new Date().getTime() > expiryTime) {
      localStorage.clear();
      window.location.href = '/'; // Redirect tới trang login khi token hết hạn
    }
  } catch (error) {
    localStorage.clear();
    window.location.href = '/'; // Redirect tới trang login khi có lỗi
  }
};

// Bắt đầu kiểm tra token định kỳ
const startTokenCheck = () => {
  setInterval(() => {
    checkTokenAndLogout();
  }, 60000); // Kiểm tra token mỗi 60 giây
};

startTokenCheck();
