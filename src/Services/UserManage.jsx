import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.withCredentials = true;

class UserManage {
    async GetUserAccount() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }
            
            const response = await axios.get(`${API_ENDPOINT}/api/Account/GetAllUserLogin`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;            
        } catch (error) {
            console.error("Error fetching user accounts:", error);
            throw error;   
        }
    }

    async GetRoleById(userId) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }
            
            const response = await axios.get(`${API_ENDPOINT}/api/Account/role/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error(`Error fetching role for user ${userId}:`, error);
            throw error;
        }
    }
    
    async LockUser(userId) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }
            
            const response = await axios.post(`${API_ENDPOINT}/api/Account/LockUser/${userId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error(`Error locking user ${userId}:`, error);
            throw error;
        }
    }

    async UnLockUser(userId) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }
            
            const response = await axios.post(`${API_ENDPOINT}/api/Account/UnLockUser/${userId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error(`Error unlocking user ${userId}:`, error);
            throw error;
        }
    }
}

export default new UserManage