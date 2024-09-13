import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.withCredentials = true; // cho phép gửi cookie hay token
class ProfileService {
    UpdateUserProfile(id, fullName, userId, email, phoneNumber,address) {
        return axios.put(`${API_ENDPOINT}/api/UserProfiles/UpdateUserProfile/${id}`, {
            Id: id,
            fullName: fullName,
            userId: userId,
            email: email,
            phoneNumber: phoneNumber,
            address: address
        });
    }

    CreateUserProfile(fullName, userId, email, phoneNumber, address) {
        return axios.post(`${API_ENDPOINT}/api/UserProfiles/CreateUserProfile`, {
            fullName: fullName,
            userId: userId,
            email: email,
            phoneNumber: phoneNumber,
            address: address
        });
    }

    UploadAvatar(id, formData) {
        return axios.post(`${API_ENDPOINT}/api/UserProfiles/${id}/UploadAvatar`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    DeleteAvatar(id){
        return axios.delete(`${API_ENDPOINT}/api/UserProfiles/DeleteAvatar/${id}`);
    }
}

export default new ProfileService()