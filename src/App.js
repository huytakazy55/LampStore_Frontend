import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes, useLocation, UNSAFE_future } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AdminDashboard from './components/admin/Dashboard/AdminDashboard/AdminDashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import ProductDetail from './components/user/ProductDetailPage/ProductDetail';
import ChatButton from './components/user/Chat/ChatButton';
import './App.css';

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
            <ProtectedRoute roleRequired="Administrator">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path='/ProductDetail' element={<ProductDetail />} />
      </Routes>
      
      {/* Chat Button - chỉ hiển thị cho user đã login và không ở trang admin */}
      {!isAdminPage && isUserLoggedIn && <ChatButton />}
    </>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
}

export default App;