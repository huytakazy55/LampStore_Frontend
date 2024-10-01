import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Dịch ngữ cho từng ngôn ngữ
const resources = {
  en: {
    translation: {
      HomePage: 'Home Page',
      Home: 'Home',
      Users: 'Users',
      Category: 'Category',
      Products: 'Products',
      Orders: 'Orders',
      Delivery: 'Delivery',
      Setting: 'Setting',
      SaleOverTime: 'Sales Over Time',
      Create: 'Create',
      Update: 'Update',
      Upload: 'Upload',
      Product: 'Product',
    },
  },
  vi: {
    translation: {
      HomePage: 'Trang chủ',
      Home: 'Trang chủ',
      Users: 'Người dùng',
      Category: 'Danh mục',
      Products: 'Sản phẩm',
      Orders: 'Đặt hàng',
      Delivery: 'Vận chuyển',
      Setting: 'Cài đặt',
      SaleOverTime: 'Doanh thu bán hàng theo thời gian',
      Create: 'Thêm mới',
      Update: 'Chỉnh sửa',
      Upload: 'Tải lên',
      Product: 'Sản phẩm',
    },
  },
};

// Cấu hình i18n
i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
  .use(initReactI18next) // Kết nối với React
  .init({
    resources,
    fallbackLng: 'en', // Ngôn ngữ dự phòng nếu không tìm thấy ngôn ngữ hiện tại
    interpolation: {
      escapeValue: false, // React đã xử lý việc escape XSS
    },
  });

export default i18n;