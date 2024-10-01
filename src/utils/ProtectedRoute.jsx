import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, roleRequired }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("Bạn chưa đăng nhập");
        return <Navigate to="/" />;
    }

    const userRole = jwtDecode(token).role;

    if (userRole !== roleRequired) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;