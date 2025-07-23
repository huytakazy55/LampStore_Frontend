import axiosInstance from "./axiosConfig";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

class UserManage {
    async GetUserAccount() {
        try {
            const response = await axiosInstance.get("/api/Account/GetAllUserLogin");
            return response.data;            
        } catch (error) {
            console.error("Error fetching user accounts:", error);
            throw error;   
        }
    }

    async GetRoleById(userId) {
        try {
            const response = await axiosInstance.get(`/api/Account/role/${userId}`);
            return response;
        } catch (error) {
            console.error(`Error fetching role for user ${userId}:`, error);
            throw error;
        }
    }
    
    async LockUser(userId) {
        try {
            const response = await axiosInstance.post(`/api/Account/LockUser/${userId}`, {});
            return response;
        } catch (error) {
            console.error(`Error locking user ${userId}:`, error);
            throw error;
        }
    }

    async UnLockUser(userId) {
        try {
            const response = await axiosInstance.post(`/api/Account/UnLockUser/${userId}`, {});
            return response;
        } catch (error) {
            console.error(`Error unlocking user ${userId}:`, error);
            throw error;
        }
    }
}

export default new UserManage