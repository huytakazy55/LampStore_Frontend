# Hướng dẫn Setup Google OAuth
# Hướng dẫn Setup Google OAuth

## 1. Tạo Google Cloud Project

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Đi tới **APIs & Services** > **Library**
4. Tìm và enable **Google+ API** (hoặc **Google Identity Services**)

## 2. Tạo OAuth 2.0 Credentials

1. Đi tới **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Chọn **Application type**: **Web application**
4. Điền thông tin:
   - **Name**: Tên ứng dụng của bạn
   - **Authorized JavaScript origins**:
     ```
     http://localhost:3000
     http://localhost:3001
     https://yourdomain.com
     ```
   - **Authorized redirect URIs**: Không cần thiết cho client-side
5. Click **Create** và copy **Client ID**

## 3. Cấu hình Environment Variables

1. Copy file `.env.example` thành `.env`:
   ```bash
   cp .env.example .env
   ```

2. Mở file `.env` và thay thế:
   ```env
   REACT_APP_API_ENDPOINT=http://localhost:5000
   REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
   ```

3. Thay `YOUR_GOOGLE_CLIENT_ID_HERE` bằng Client ID từ Google Cloud Console

## 4. Test Google OAuth

1. Restart React app:
   ```bash
   npm start
   ```

2. Mở trang đăng nhập
3. Click nút **Google**
4. Đăng nhập bằng tài khoản Google của bạn
5. Kiểm tra user được tạo trong database

## 5. Troubleshooting

### Lỗi "Invalid origin"
- Đảm bảo URL trong **Authorized JavaScript origins** khớp với domain bạn đang chạy

### Lỗi "Client ID not found"  
- Kiểm tra `REACT_APP_GOOGLE_CLIENT_ID` trong file `.env`
- Đảm bảo restart React app sau khi thay đổi `.env`

### Lỗi "API not enabled"
- Đảm bảo đã enable **Google+ API** hoặc **Google Identity Services** trong Google Cloud Console

## 6. Production Setup

Khi deploy production, nhớ:
1. Thêm domain production vào **Authorized JavaScript origins**
2. Cập nhật `REACT_APP_API_ENDPOINT` trong file `.env.production`
3. Đảm bảo HTTPS được enable

## 7. Database Schema

Google OAuth sẽ tự động:
- Tạo user mới nếu email chưa tồn tại
- Lưu `GoogleUserId` vào database  
- Tạo `UserProfile` với `FullName` và `ProfileAvatar` từ Google
- Assign role `Customer` cho user mới