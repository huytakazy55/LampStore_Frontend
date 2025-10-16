import axiosInstance from "./axiosConfig";
import { toast } from 'react-toastify';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

class AuthService {
    signin(username, password, rememberme){
        return axiosInstance.post("/api/Account/SignIn", {
            username: username,
            password: password,
            rememberme: rememberme
        });
    }
    signup(username, email, password) {
        return axiosInstance.post("/api/Account/SignUp", {
            username: username,
            email: email,
            password: password
        });
    }

    googleSignIn(googleUserData) {
        return axiosInstance.post("/api/Account/GoogleSignIn", {
            email: googleUserData.email,
            name: googleUserData.name,
            picture: googleUserData.picture,
            googleUserId: googleUserData.sub,
            token: googleUserData.token
        });
    }

    async logout() {
        try {
            await axiosInstance.post("/api/Account/Logout");
            localStorage.clear();
            await toast.success("Đã đăng xuất tài khoản!");
            window.location.reload();
            return true;
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi đăng xuất!");
            return false;
        }
    }

    async profile() {
        try {
            const response = await axiosInstance.get("/api/Account/profile");
            return response.data;
        } catch (error) {
            return null;
        }
    }

    ForgotPassword(emailOrUsername) {
        return axiosInstance.post("/api/Account/ForgotPassword", {
            emailOrUsername: emailOrUsername
        });
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService()