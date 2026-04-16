import axiosInstance from './axiosConfig';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const OrderService = {
    // Get all orders (admin)
    getAllOrders: async () =>
    {
        const response = await axiosInstance.get(`${API_ENDPOINT}/api/Orders`);
        return response.data;
    },

    // Get order by ID
    getOrderById: async (id) =>
    {
        const response = await axiosInstance.get(`${API_ENDPOINT}/api/Orders/${id}`);
        return response.data;
    },

    // Create a new order (checkout)
    createOrder: async (orderData) =>
    {
        const response = await axiosInstance.post(`${API_ENDPOINT}/api/Orders`, orderData);
        return response.data;
    },

    // Update order status (admin)
    updateOrderStatus: async (id, status) =>
    {
        const response = await axiosInstance.patch(`${API_ENDPOINT}/api/Orders/${id}/status`, { status });
        return response.data;
    },

    // Delete order (admin)
    deleteOrder: async (id) =>
    {
        const response = await axiosInstance.delete(`${API_ENDPOINT}/api/Orders/${id}`);
        return response.data;
    },
};

export default OrderService;
