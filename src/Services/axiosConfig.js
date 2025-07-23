import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

// Tạo axios instance chính
const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor để tự động thêm token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Kiểm tra token có hợp lệ không
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          // Token đã hết hạn
          handleTokenExpired();
          return Promise.reject(new Error('Token đã hết hạn'));
        }
        
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        // Token không hợp lệ
        handleTokenExpired();
        return Promise.reject(new Error('Token không hợp lệ'));
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi authentication
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      switch (response.status) {
        case 401: // Unauthorized
          handleTokenExpired();
          break;
        case 403: // Forbidden
          toast.error('Bạn không có quyền truy cập chức năng này!');
          break;
        case 500: // Internal Server Error
          toast.error('Có lỗi xảy ra trên server!');
          break;
        default:
          if (response.data && response.data.message) {
            toast.error(response.data.message);
          } else {
            toast.error('Có lỗi xảy ra!');
          }
      }
    } else {
      // Network error hoặc timeout
      toast.error('Không thể kết nối đến server!');
    }
    
    return Promise.reject(error);
  }
);

// Hàm xử lý khi token hết hạn
const handleTokenExpired = () => {
  // Xóa token và dữ liệu người dùng
  localStorage.clear();
  
  // Hiển thị thông báo
  toast.error('Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại.');
  
  // Dispatch event để cập nhật UI
  window.dispatchEvent(new Event('userLoginStatusChanged'));
  
  // Chuyển về trang chủ
  if (window.location.pathname.startsWith('/admin')) {
    window.location.href = '/';
  }
  
  // Reload trang để reset state
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

// Hàm kiểm tra token có hợp lệ không
export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

// Hàm lấy thời gian còn lại của token (tính bằng giây)
export const getTokenTimeRemaining = () => {
  const token = localStorage.getItem('token');
  if (!token) return 0;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return Math.max(0, decoded.exp - currentTime);
  } catch {
    return 0;
  }
};

// Export axios instance đã được cấu hình
export default axiosInstance; 