import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.withCredentials = true;

class TagManage {
    GetTag() {
        return axios.get(`${API_ENDPOINT}/api/Tags`);
        
    }

    GetTagById(id) {
        return axios.get(`${API_ENDPOINT}/api/Tags/${id}`);
    }

    UpdateTag(id, name, description) {
        return axios.put(`${API_ENDPOINT}/api/Tags/${id}`, {
            id: id,
            name: name,
            description: description
        });
    }

    CreateTag(tag) {
        return axios.post(`${API_ENDPOINT}/api/Tags`, tag);
    }

    DeleteTag(id) {
        return axios.delete(`${API_ENDPOINT}/api/Tags/${id}`);
    }
}

export default new TagManage