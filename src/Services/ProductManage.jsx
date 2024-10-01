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

    GetProductImageById(id) {
        return axios.get(`${API_ENDPOINT}/api/Products/${id}/images`);
    }

    UpdateProduct(id, name, description, price, quantity, categoryId, dateAdded, isAvailable) {
        return axios.put(`${API_ENDPOINT}/api/Products/${id}`, {
            id: id,
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            categoryId: categoryId,
            dateAdded: dateAdded,
            isAvailable: isAvailable
        });
    }

    CreateProduct(name, description, price, quantity, categoryId, dateAdded, isAvailable) {
        return axios.post(`${API_ENDPOINT}/api/Products`,{
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            categoryId: categoryId,
            dateAdded: dateAdded,
            isAvailable: isAvailable
        });
    }

    UploadImageProduct(productId, formData) {
        return axios.post(`${API_ENDPOINT}/api/Products/${productId}/images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    DeleteProductImage(imageId) {
        return axios.delete(`${API_ENDPOINT}/api/Products/image/${imageId}`);
    }

    DeleteProduct(id) {
        return axios.delete(`${API_ENDPOINT}/api/Products/${id}`);
    }
}

export default new ProductManage