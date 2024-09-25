import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.withCredentials = true;

class CategoryManage {
    GetCategory() {
        return axios.get(`${API_ENDPOINT}/api/Categories`);
        
    }

    GetCategoryById(id) {
        return axios.get(`${API_ENDPOINT}/api/Categories/${id}`);
    }

    CreateCategory(name, description) {
        return axios.post(`${API_ENDPOINT}/api/Categories`,{
            name: name,
            description: description
        });
    }

    DeleteCategory(id) {
        return axios.delete(`${API_ENDPOINT}/api/Categories/${id}`);
    }
}

export default new CategoryManage