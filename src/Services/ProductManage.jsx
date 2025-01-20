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

    UpdateProduct(id, name, description, originalprice, discount, saleprice, quantity, weight, materials, categoryId, tags, rating, viewcount, reviewcount, favorites, sellcount, dateAdded, isAvailable) {
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
            isAvailable: isAvailable
        });
    }

    CreateProduct(name, description, rating, reviewCount, tags, viewCount, favorites, sellCount, categoryId, dateAdded, isAvailable, nameType, productvariantid, typeId, nameValue) {
        try {
            const AddProduct = axios.post(`${API_ENDPOINT}/api/Products`,{
                name: name,
                description: description,
                rating: rating,
                reviewcount: reviewCount,
                tags: tags,
                viewcount: viewCount,
                favorites: favorites,
                sellcount: sellCount,
                categoryId: categoryId,
                dateadded: dateAdded,
                isAvailable: isAvailable
            });
    
            const CreateType = axios.post(`${API_ENDPOINT}/api/Products/AddVariantType`,{
                name: nameType,
                productvariantid: productvariantid
            });
            
            const CreateValue = axios.post(`${API_ENDPOINT}/api/Products/AddVariantValue`, {
                typeId: typeId, 
                value: nameValue
            })

            const result = Promise.all([AddProduct, CreateType, CreateValue]);
            return {
                success: true,
                data: result.map(res => res.data)
            }

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

    CreateVariantproduct(productId, variants) {
        try {
            const response = axios.post(`${API_ENDPOINT}/api/Products/${productId}/variants`,
                variants
            );
            return response.data;
        } catch (error) {
            console.error("Error while creating product variant:", error);
            throw error;
        }
    }

    GetVariantByProductId(productId) {
        try {
            return axios.get(`${API_ENDPOINT}/api/Products/${productId}/variants`);
        } catch (error) {
            console.log("Error get variants");
            throw error;
        }
    }

    DeleteProductImage(imageId) {
        return axios.delete(`${API_ENDPOINT}/api/Products/image/${imageId}`);
    }

    DeleteProduct(id) {
        return axios.delete(`${API_ENDPOINT}/api/Products/${id}`);
    }
}

export default new ProductManage