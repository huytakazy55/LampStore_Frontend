import axios from "axios";
import { jwtDecode } from 'jwt-decode';
const API_ENDPOINT = "https://localhost:7124";
axios.defaults.withCredentials = true; // cho phép gửi cookie hay token

class AuthService {
    signin(username, password, rememberme){
        return axios.post(API_ENDPOINT+"/api/Account/SignIn", {
            username: username,
            password: password,
            rememberme: rememberme
        }, { withCredentials: true });// cho phép gửi cookie hay token
    }
    signup(fullname, email, phonenumber ,username, password) {
        return axios.post(API_ENDPOINT+"/api/Account/SignUp", {
            fullname: fullname,
            email: email,
            phonenumber: phonenumber,
            username: username,
            password: password
        });
    }
    decodeAndStoreToken = (token) => {
        const decoded = jwtDecode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('role', decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        localStorage.setItem('email', decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
        localStorage.setItem('username', decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
        localStorage.setItem('isLogin', true);
    }

    async logout() {
        try {
            await axios.post(API_ENDPOINT+"/api/Account/logout");
            localStorage.clear();
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    profile() {
        return axios.get(API_ENDPOINT+"/profile");
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService()