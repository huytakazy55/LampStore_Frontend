import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.withCredentials = true;

// Tạo instance axios riêng cho upload
const uploadAxios = axios.create({
    baseURL: API_ENDPOINT,
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity
});

class ProductManage {
    GetProduct() {
        return axios.get(`${API_ENDPOINT}/api/Products`);
        
    }

    GetProductById(id) {
        return axios.get(`${API_ENDPOINT}/api/Products/${id}`);
    }

    GetVariantById(id) {
        return axios.get(`${API_ENDPOINT}/api/Products/Variant/${id}`);
    }

    GetProductImageById(id) {
        return axios.get(`${API_ENDPOINT}/api/Products/${id}/images`);
    }

    GetProductTypeByProductId(productId) {
        return axios.get(`${API_ENDPOINT}/api/Products/VariantType/${productId}`);
    }

    GetProductValueByTypeId(typeId) {
        return axios.get(`${API_ENDPOINT}/api/Products/VariantValue/${typeId}`);
    }

    UpdateProduct(productData) {
        return axios.put(`${API_ENDPOINT}/api/Products/${productData.id}`, productData);
    }

    async CreateProduct(productData) {
        try {
            const reponse = await axios.post(`${API_ENDPOINT}/api/Products`, productData);
            return reponse.data;
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || error.message
            }
        }
    }

    UploadImageProduct(productId, formData) {
        return axios.post(`${API_ENDPOINT}/api/Products/${productId}/images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log('Upload progress:', percentCompleted);
            }
        });
    }

    DeleteProductImage(imageId) {
        return axios.delete(`${API_ENDPOINT}/api/Products/image/${imageId}`);
    }

    DeleteProduct(id) {
        return axios.delete(`${API_ENDPOINT}/api/Products/${id}`);
    }

    ImportProducts(products) {
        return axios.post(`${API_ENDPOINT}/api/Products/import`, products);
    }
}

export default new ProductManage