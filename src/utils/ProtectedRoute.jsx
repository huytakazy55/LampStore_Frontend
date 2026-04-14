import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { isTokenValid, refreshAccessToken } from '../Services/axiosConfig';

const ProtectedRoute = ({ children, rolesRequired = ["Administrator"] }) => {
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentToken, setCurrentToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error("Bạn chưa đăng nhập");
                setIsAuthenticated(false);
                setAuthChecked(true);
                return;
            }

            // Nếu accessToken còn hạn → cho qua luôn
            if (isTokenValid()) {
                setCurrentToken(token);
                setIsAuthenticated(true);
                setAuthChecked(true);
                return;
            }

            // AccessToken hết hạn → thử refresh bằng refreshToken
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                toast.error("Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại.");
                localStorage.clear();
                window.dispatchEvent(new Event('userLoginStatusChanged'));
                setIsAuthenticated(false);
                setAuthChecked(true);
                return;
            }

            const refreshed = await refreshAccessToken();
            if (refreshed && isTokenValid()) {
                const newToken = localStorage.getItem('token');
                setCurrentToken(newToken);
                setIsAuthenticated(true);
                setAuthChecked(true);
            } else {
                toast.error("Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại.");
                localStorage.clear();
                window.dispatchEvent(new Event('userLoginStatusChanged'));
                setIsAuthenticated(false);
                setAuthChecked(true);
            }
        };

        checkAuth();
    }, []);

    // Chưa check xong auth → tạm không render gì (có thể đặt loading nếu muốn)
    if (!authChecked) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    try {
        const decoded = jwtDecode(currentToken);
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