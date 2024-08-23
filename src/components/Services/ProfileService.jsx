import axios from "axios";
const API_ENDPOINT = 'https://localhost:7124';
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
}

export default new ProfileService()