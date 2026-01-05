import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { isTokenValid } from '../Services/axiosConfig';

const ProtectedRoute = ({ children, rolesRequired = ["Administrator"] }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("Bạn chưa đăng nhập");
        return <Navigate to="/" />;
    }

    // Kiểm tra token có hợp lệ không
    if (!isTokenValid()) {
        toast.error("Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại.");
        localStorage.clear();
        window.dispatchEvent(new Event('userLoginStatusChanged'));
        return <Navigate to="/" />;
    }

    try {
        const decoded = jwtDecode(token);
        const roleClaim = decoded.role;
        const userRoles = Array.isArray(roleClaim) ? roleClaim : roleClaim ? [roleClaim] : [];

        const isAuthorized = rolesRequired.some(r => userRoles.includes(r));
        if (!isAuthorized) {
            toast.error("Bạn không có quyền truy cập trang này!");
            return <Navigate to="/" />;
        }

        return children;
    } catch (error) {
        toast.error("Token không hợp lệ! Vui lòng đăng nhập lại.");
        localStorage.clear();
        window.dispatchEvent(new Event('userLoginStatusChanged'));
        return <Navigate to="/" />;
    }
};

export default ProtectedRoute;