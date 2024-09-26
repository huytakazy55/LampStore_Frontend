import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.withCredentials = true;

class ProductManage {
    GetProduct() {
        return axios.get(`${API_ENDPOINT}/api/Products`);
        
    }

    GetProductById(id) {
        return axios.get(`${API_ENDPOINT}/api/Products/${id}`);
    }

    UpdateProduct(id, name, description) {
        return axios.put(`${API_ENDPOINT}/api/Products/${id}`, {
            id: id,
            name: name,
            description: description
        });
    }

    CreateProduct(name, description) {
        return axios.post(`${API_ENDPOINT}/api/Products`,{
            name: name,
            description: description
        });
    }

    DeleteProduct(id) {
        return axios.delete(`${API_ENDPOINT}/api/Products/${id}`);
    }
}

export default new ProductManage