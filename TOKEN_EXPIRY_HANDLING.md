# Hệ thống Xử lý Token Hết hạn

## Tổng quan

Hệ thống này tự động xử lý việc token JWT hết hạn và đăng xuất người dùng một cách mượt mà, tránh tình trạng giao diện bị "treo" khi token hết hạn.

## Các thành phần chính

### 1. Axios Interceptor (`src/Services/axiosConfig.js`)

- **Request Interceptor**: Tự động thêm token vào header và kiểm tra tính hợp lệ
- **Response Interceptor**: Xử lý lỗi 401 (Unauthorized) và tự động đăng xuất
- **Token Validation**: Kiểm tra thời gian hết hạn của token trước mỗi request

### 2. Token Expiry Warning (`src/components/common/TokenExpiryWarning.jsx`)

- Hiển thị cảnh báo khi token sắp hết hạn (5 phút trước)
- Đếm ngược thời gian còn lại
- Toast notification khi còn 1 phút

### 3. Enhanced Protected Route (`src/utils/ProtectedRoute.jsx`)

- Kiểm tra token hợp lệ trước khi render component
- Tự động chuyển hướng nếu token không hợp lệ
- Hiển thị thông báo lỗi phù hợp

### 4. Updated Services

Tất cả các service đã được cập nhật để sử dụng `axiosInstance` thay vì `axios` trực tiếp:
- `AuthService.jsx`
- `UserManage.jsx`
- `ChatService.jsx`
- `ProfileService.jsx`
- `ProductManage.jsx`
- `TagManage.jsx`
- `BannerService.jsx`
- `CategoryManage.jsx`

## Cách hoạt động

### 1. Kiểm tra Token
```javascript
// Tự động kiểm tra trước mỗi request
const isTokenValid = () => {
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
```

### 2. Xử lý Token Hết hạn
```javascript
const handleTokenExpired = () => {
  // Xóa token và dữ liệu người dùng
  localStorage.clear();
  
  // Hiển thị thông báo
  toast.error('Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại.');
  
  // Cập nhật UI
  window.dispatchEvent(new Event('userLoginStatusChanged'));
  
  // Chuyển về trang chủ nếu đang ở admin
  if (window.location.pathname.startsWith('/admin')) {
    window.location.href = '/';
  }
  
  // Reload trang để reset state
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};
```

### 3. Cảnh báo Trước khi Hết hạn
- Hiển thị cảnh báo 5 phút trước khi token hết hạn
- Toast notification khi còn 1 phút
- Đếm ngược thời gian còn lại

## Lợi ích

1. **Trải nghiệm người dùng tốt hơn**: Không bị "treo" giao diện khi token hết hạn
2. **Bảo mật**: Tự động đăng xuất khi token không hợp lệ
3. **Thông báo rõ ràng**: Người dùng biết khi nào token sắp hết hạn
4. **Tự động xử lý**: Không cần can thiệp thủ công
5. **Nhất quán**: Tất cả API calls đều được xử lý đồng nhất

## Cấu hình

### Thời gian kiểm tra
- **Token validation**: Trước mỗi request
- **Expiry warning**: Mỗi 30 giây
- **Background check**: Mỗi 1 phút

### Thông báo
- **5 phút trước**: Toast warning
- **1 phút trước**: Toast warning không tự đóng
- **Khi hết hạn**: Toast error và tự động đăng xuất

## Sử dụng

### Import axiosConfig
```javascript
import axiosInstance from './Services/axiosConfig';

// Sử dụng thay vì axios
const response = await axiosInstance.get('/api/endpoint');
```

### Kiểm tra token
```javascript
import { isTokenValid, getTokenTimeRemaining } from './Services/axiosConfig';

if (isTokenValid()) {
  const remaining = getTokenTimeRemaining();
  console.log(`Token còn ${remaining} giây`);
}
```

### Thêm TokenExpiryWarning vào component
```javascript
import TokenExpiryWarning from './components/common/TokenExpiryWarning';

function App() {
  return (
    <div>
      {/* Your components */}
      <TokenExpiryWarning />
    </div>
  );
}
```

## Troubleshooting

### Token không được tự động thêm
- Kiểm tra localStorage có token không
- Đảm bảo đã import axiosConfig trong App.js

### Không nhận được cảnh báo
- Kiểm tra TokenExpiryWarning component đã được thêm vào App
- Kiểm tra console có lỗi JavaScript không

### API calls vẫn bị lỗi 401
- Đảm bảo service đã được cập nhật để sử dụng axiosInstance
- Kiểm tra token có đúng format không

## Lưu ý

1. **Backend**: Đảm bảo backend trả về status 401 khi token hết hạn
2. **CORS**: Cấu hình CORS đúng để nhận được response headers
3. **Error Handling**: Luôn có try-catch cho API calls
4. **Testing**: Test với token sắp hết hạn để đảm bảo flow hoạt động đúng 