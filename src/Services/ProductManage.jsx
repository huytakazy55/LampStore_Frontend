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

    UpdateProduct(id, name, description, originalprice, discount, saleprice, quantity, weight, materials, categoryId, tags, rating, viewcount, reviewcount, favorites, sellcount, dateAdded, status) {
        return axios.put(`${API_ENDPOINT}/api/Products/${id}`, {
            id: id,
            name: name,
            description: description,
            originalprice: originalprice,
            discount: discount,
            saleprice: saleprice,
            quantity: quantity,
            weight: weight,
            materials: materials,
            categoryId: categoryId,
            tags: tags,
            rating: rating,
            viewcount: viewcount,
            reviewcount: reviewcount,
            favorites: favorites,
            sellcount: sellcount,
            dateAdded: dateAdded,
            status: status
        });
    }

    async CreateProduct(productData) {
        try {
            const reponse = await axios.post(`${API_ENDPOINT}/api/Products/CreateProduct`, productData);
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