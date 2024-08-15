import axios from "axios";
import { toast } from 'react-toastify';
const API_ENDPOINT = "https://localhost:7124";
axios.defaults.withCredentials = true; // cho phép gửi cookie hay token

class AuthService {
    signin(username, password, rememberme){
        return axios.post(API_ENDPOINT+"/api/Account/SignIn", {
            username: username,
            password: password,
            rememberme: rememberme
        }, { withCredentials: true });
    }
    signup(username, password) {
        return axios.post(API_ENDPOINT+"/api/Account/SignUp", {
            username: username,
            password: password
        });
    }

    async logout() {
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axios.post(API_ENDPOINT + "/api/Account/logout");
            localStorage.clear();
            await toast.success("Đã đăng xuất tài khoản!");
          } catch (error) {
            toast.error("Đã xảy ra lỗi khi đăng xuất!");
          }
    }

    async profile() {
        try {
            const token = localStorage.getItem("token");
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(API_ENDPOINT + "/api/Account/profile");
            return response.data;
        } catch (error) {
            return null;
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService()