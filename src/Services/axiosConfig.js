import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || (typeof window !== 'undefined' ? window.location.origin : undefined);

// Tạo axios instance chính
const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true,
  timeout: 10000,
});

// Biến để tránh refresh token nhiều lần cùng lúc
let isRefreshing = false;
let failedQueue = [];

// Hàm refresh access token
const refreshAccessToken = async () => {
  if (isRefreshing) {
    // Đang refresh, đợi kết quả
    return new Promise((resolve) => {
      failedQueue.push(resolve);
    });
  }

  isRefreshing = true;

  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const response = await axios.post(`${API_ENDPOINT}/api/Account/Refresh`, {
      refreshToken: refreshToken
    });

    // Lưu tokens mới
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('tokenExpiry', Date.now() + (response.data.expiresIn * 1000));

    // Resolve tất cả requests đang đợi
    failedQueue.forEach(resolve => resolve(true));
    failedQueue = [];

    return true;
  } catch (error) {
    // Refresh thất bại
    failedQueue.forEach(resolve => resolve(false));
    failedQueue = [];
    
    // Logout nếu refresh thất bại
    handleTokenExpired();
    return false;
  } finally {
    isRefreshing = false;
  }
};

// Request interceptor để tự động thêm token và refresh nếu cần
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if (token) {
      // Kiểm tra token có hợp lệ không
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        // Kiểm tra token sắp hết hạn (trước 1 phút)
        if (decoded.exp < currentTime + 60) {
          // Token sắp hết hạn hoặc đã hết hạn → Refresh
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            // Cập nhật token mới vào header
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
          } else {
            // Refresh thất bại → Xóa token
            delete config.headers.Authorization;
          }
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        // Token không hợp lệ
        handleTokenExpired();
        delete config.headers.Authorization;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi authentication và tự động refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const { response } = error;
    
    if (response) {
      switch (response.status) {
        case 401: // Unauthorized
          // Nếu chưa retry và có refresh token
          if (!originalRequest._retry && localStorage.getItem('refreshToken')) {
            originalRequest._retry = true;

            // Thử refresh token
            const refreshed = await refreshAccessToken();

            if (refreshed) {
              // Retry request ban đầu với token mới
              originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
              return axiosInstance(originalRequest);
            } else {
              // Refresh thất bại → Logout
              handleTokenExpired();
            }
          } else {
            // Không có refresh token hoặc đã retry → Logout
            handleTokenExpired();
          }
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
  // Xóa tokens
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('tokenExpiry');
  
  toast.error('Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại.');
  
  // Dispatch event để cập nhật UI
  window.dispatchEvent(new Event('userLoginStatusChanged'));
  
  if (window.location.pathname.startsWith('/admin')) {
    window.location.href = '/';
  }
  
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

// Export hàm refresh token để dùng ở nơi khác nếu cần
export { refreshAccessToken };

// Export axios instance đã được cấu hình
export default axiosInstance; 