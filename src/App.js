import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './components/admin/Dashboard/AdminDashboard/AdminDashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import ProductDetail from './components/user/ProductDetailPage/ProductDetail';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'summernote/dist/summernote-bs4.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;