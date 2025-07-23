import axiosInstance from "./axiosConfig";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

class CategoryManage {
    GetCategory() {
        return axiosInstance.get("/api/Categories");
        
    }

    GetCategoryById(id) {
        return axiosInstance.get(`/api/Categories/${id}`);
    }

    UpdateCategory(id, name, description) {
        return axiosInstance.put(`/api/Categories/${id}`, {
            id: id,
            name: name,
            description: description
        });
    }

    CreateCategory(name, description) {
        return axiosInstance.post("/api/Categories",{
            name: name,
            description: description
        });
    }

    DeleteCategory(id) {
        return axiosInstance.delete(`/api/Categories/${id}`);
    }

    BulkDeleteCategories(ids) {
        return axiosInstance.delete("/api/categories/bulk", {
            data: ids
        });
    }
}

export default new CategoryManage