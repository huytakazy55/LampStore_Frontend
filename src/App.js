import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes, useLocation, UNSAFE_future } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import AdminDashboard from './components/admin/Dashboard/AdminDashboard/AdminDashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import ProductDetail from './components/user/ProductDetailPage/ProductDetail';
import CheckoutPage from './pages/CheckoutPage';
import ChatButton from './components/user/Chat/ChatButton';
import TokenExpiryWarning from './components/common/TokenExpiryWarning';
import './App.css';
import './Services/axiosConfig';
import NotificationService from './Services/NotificationService';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';
import FloatingCart from './components/user/FloatingCart/FloatingCart';
import WishlistPage from './components/user/WishlistPage/WishlistPage';
import NewsListPage from './pages/NewsListPage';
import NewsDetailPage from './pages/NewsDetailPage';
import CategoryPage from './pages/CategoryPage';

// Expose toast to global scope for NotificationService
if (typeof window !== 'undefined') {
  window.toast = toast;
}

function AppContent() {
  const location = useLocation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const isAdminPage = location.pathname.startsWith('/admin');

  // Check login status và listen cho changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const loggedIn = token !== null && token !== '';

      setIsUserLoggedIn(loggedIn);

      // Khởi tạo SignalR notifications sớm sau khi đăng nhập
      if (loggedIn) {
        NotificationService.setupSignalRNotifications();
      }
    };

    // Check ngay lập tức
    checkLoginStatus();

    // Listen cho storage changes (khi user login/logout)
    window.addEventListener('storage', checkLoginStatus);

    // Custom event cho login/logout actions
    window.addEventListener('userLoginStatusChanged', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('userLoginStatusChanged', checkLoginStatus);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/admin/*'
          element={
            <ProtectedRoute rolesRequired={[
              "Administrator",
              "Manager",
              "Accountant",
              "Human Resource",
              "Warehouse staff"
            ]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/wishlist' element={<WishlistPage />} />
        <Route path='/news' element={<NewsListPage />} />
        <Route path='/news/:id' element={<NewsDetailPage />} />
        <Route path='/categories' element={<CategoryPage />} />
        <Route path='/categories/:categoryId' element={<CategoryPage />} />
      </Routes>

      {/* Chat Button - chỉ hiển thị cho user đã login và không ở trang admin */}
      {!isAdminPage && isUserLoggedIn && <ChatButton />}

      {/* Floating Cart - hiển thị trên trang user (không phải admin) */}
      {!isAdminPage && <FloatingCart />}

      {/* Token Expiry Warning */}
      <TokenExpiryWarning />

      {/* Toast Container - global */}
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme='colored'
      />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <WishlistProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppContent />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;