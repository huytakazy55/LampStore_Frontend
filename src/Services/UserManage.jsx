import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.withCredentials = true;
const token = localStorage.getItem("token");

class UserManage {
    async GetUserAccount() {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`${API_ENDPOINT}/api/Account/GetAllUserLogin`);
            return response.data;            
        } catch (error) {
            return null;   
        }
    }

    GetRoleById(userId) {
        return axios.get(`${API_ENDPOINT}/api/Account/role/${userId}`);
    }
    
    LockUser(userId) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axios.post(`${API_ENDPOINT}/api/Account/LockUser/${userId}`);
    }

    UnLockUser(userId) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axios.post(`${API_ENDPOINT}/api/Account/UnLockUser/${userId}`);
    }
}

export default new UserManage