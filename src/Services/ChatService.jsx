import axios from "axios";
import * as signalR from "@microsoft/signalr";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

class ChatService {
    constructor() {
        this.connection = null;
        this.isConnected = false;
    }

    // SignalR Connection (ENABLED)
    async startConnection() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("No token found, cannot start SignalR connection");
                return false;
            }

            console.log('🔗 Connecting to SignalR Hub:', `${API_ENDPOINT}/chathub`);
            
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(`${API_ENDPOINT}/chathub`, {
                    accessTokenFactory: () => {
                        console.log('🔑 Providing access token for SignalR');
                        return token;
                    },
                    // Use all available transports with fallback
                    transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.ServerSentEvents | signalR.HttpTransportType.LongPolling,
                    skipNegotiation: false
                })
                .withAutomaticReconnect([0, 2000, 10000, 30000])
                .configureLogging(signalR.LogLevel.Debug) // More detailed logging
                .build();

            // Setup event handlers
            this.setupEventHandlers();

            await this.connection.start();
            this.isConnected = true;
            console.log("✅ SignalR Connected successfully");
            return true;
        } catch (error) {
            console.error("❌ SignalR Connection failed:", error);
            this.isConnected = false;
            return false;
        }
    }

    async initializeConnection() {
        if (!this.isConnected && !this.connection) {
            return await this.startConnection();
        }
        return this.isConnected;
    }

    async disconnect() {
        try {
            if (this.connection) {
                await this.connection.stop();
                this.connection = null;
                this.isConnected = false;
                console.log("SignalR disconnected");
            }
        } catch (error) {
            console.error("Error disconnecting SignalR:", error);
        }
    }

    setupEventHandlers() {
        if (!this.connection) return;

        // Nhận tin nhắn real-time
        this.connection.on("ReceiveMessage", (message) => {
            console.log("📩 Received real-time message:", message);
            // Emit custom event for components to listen
            window.dispatchEvent(new CustomEvent("newMessage", { detail: message }));
        });

        // User typing indicator
        this.connection.on("UserTyping", (data) => {
            console.log("✍️ User typing:", data);
            window.dispatchEvent(new CustomEvent("userTyping", { detail: data }));
        });

        // Message read status
        this.connection.on("MessageRead", (data) => {
            console.log("✓ Message read:", data);
            window.dispatchEvent(new CustomEvent("messageRead", { detail: data }));
        });

        // User online/offline
        this.connection.on("UserOnline", (userId) => {
            console.log("🟢 User online:", userId);
            window.dispatchEvent(new CustomEvent("userOnline", { detail: userId }));
        });

        this.connection.on("UserOffline", (userId) => {
            console.log("🔴 User offline:", userId);
            window.dispatchEvent(new CustomEvent("userOffline", { detail: userId }));
        });

        // Connection events
        this.connection.onreconnecting(() => {
            console.log("🔄 SignalR reconnecting...");
            this.isConnected = false;
        });

        this.connection.onreconnected(() => {
            console.log("✅ SignalR reconnected");
            this.isConnected = true;
        });

        this.connection.onclose(() => {
            console.log("❌ SignalR connection closed");
            this.isConnected = false;
        });
    }

    // Chat management
    async joinChat(chatId) {
        if (this.connection && this.isConnected) {
            await this.connection.invoke("JoinChat", chatId);
        }
    }

    async leaveChat(chatId) {
        if (this.connection && this.isConnected) {
            await this.connection.invoke("LeaveChat", chatId);
        }
    }

    async sendMessageViaSignalR(chatId, message) {
        if (this.connection && this.isConnected) {
            await this.connection.invoke("SendMessage", chatId, message);
        }
    }

    // Test connection helper
    async testConnection() {
        try {
            console.log('🧪 Testing SignalR connection...');
            console.log('API_ENDPOINT:', API_ENDPOINT);
            console.log('Token available:', !!localStorage.getItem("token"));
            console.log('Connection state:', this.connection?.state);
            console.log('Is connected:', this.isConnected);
            
            if (!this.isConnected) {
                console.log('⚠️ Not connected, attempting to connect...');
                await this.startConnection();
            }
            
            return this.isConnected;
        } catch (error) {
            console.error('❌ Connection test failed:', error);
            return false;
        }
    }

    // Enhanced send message (API + SignalR)
    async sendMessage(chatId, content, type = 1) {
        try {
            // 1. Send via API first (persistent storage)
            const result = await this.sendMessageApi(chatId, content, type);
            return result;
        } catch (error) {
            console.error("Error sending message:", error);
            throw error;
        }
    }

    async userTyping(chatId, isTyping) {
        if (this.connection && this.isConnected) {
            await this.connection.invoke("UserTyping", chatId, isTyping);
        }
    }

    async markAsRead(chatId, messageId) {
        if (this.connection && this.isConnected) {
            await this.connection.invoke("MarkAsRead", chatId, messageId);
        }
    }

    // Event listeners
    onReceiveMessage(callback) {
        if (this.connection) {
            this.connection.on("ReceiveMessage", callback);
        }
    }

    onUserTyping(callback) {
        if (this.connection) {
            this.connection.on("UserTyping", callback);
        }
    }

    onMessageRead(callback) {
        if (this.connection) {
            this.connection.on("MessageRead", callback);
        }
    }

    onUserOnline(callback) {
        if (this.connection) {
            this.connection.on("UserOnline", callback);
        }
    }

    onUserOffline(callback) {
        if (this.connection) {
            this.connection.on("UserOffline", callback);
        }
    }

    onNewChatCreated(callback) {
        if (this.connection) {
            this.connection.on("NewChatCreated", callback);
        }
    }

    onChatStatusUpdated(callback) {
        if (this.connection) {
            this.connection.on("ChatStatusUpdated", callback);
        }
    }

    onChatClosed(callback) {
        if (this.connection) {
            this.connection.on("ChatClosed", callback);
        }
    }

    // API calls
    async createChat(subject, priority = 2) { // Normal = 2
        const token = localStorage.getItem("token");
        const requestData = {
            subject,
            priority
        };
        
        console.log('Creating chat with data:', requestData);
        console.log('API endpoint:', `${API_ENDPOINT}/api/Chat/create`);
        console.log('Token exists:', !!token);
        
        const response = await axios.post(`${API_ENDPOINT}/api/Chat/create`, requestData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async getMyChats() {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_ENDPOINT}/api/Chat/my-chats`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }

    // Alias for UI compatibility
    async getUserChats() {
        return await this.getMyChats();
    }

    async getAllChats() {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_ENDPOINT}/api/Chat/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }

    async getChat(chatId) {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_ENDPOINT}/api/Chat/${chatId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }

    async sendMessageApi(chatId, content, type = 1) { // Text = 1
        const token = localStorage.getItem("token");
        const requestData = {
            content,
            type
        };
        
        console.log('Sending message with data:', requestData);
        console.log('Message API endpoint:', `${API_ENDPOINT}/api/Chat/${chatId}/messages`);
        
        const response = await axios.post(`${API_ENDPOINT}/api/Chat/${chatId}/messages`, requestData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async getChatMessages(chatId) {
        const token = localStorage.getItem("token");
        
        console.log('🔗 API Call: GET messages for chat', chatId);
        console.log('🔗 Endpoint:', `${API_ENDPOINT}/api/Chat/${chatId}/messages`);
        console.log('🔑 Token available:', !!token);
        
        const response = await axios.get(`${API_ENDPOINT}/api/Chat/${chatId}/messages`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        console.log('🔗 API Response Status:', response.status);
        console.log('🔗 API Response Data:', response.data);
        
        return response.data;
    }

    async assignChat(chatId, adminId) {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_ENDPOINT}/api/Chat/${chatId}/assign`, {
            adminId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }

    async updateChatStatus(chatId, status) {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${API_ENDPOINT}/api/Chat/${chatId}/status`, {
            status
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }

    async closeChat(chatId) {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_ENDPOINT}/api/Chat/${chatId}/close`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }

    async getUnreadCount() {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_ENDPOINT}/api/Chat/unread-count`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }

    async getChatStatistics() {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_ENDPOINT}/api/Chat/statistics`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }

    // Test function - call this in browser console
    async testGetMessages(chatId) {
        try {
            console.log('🧪 Testing API directly for chat:', chatId);
            const result = await this.getChatMessages(chatId);
            console.log('🧪 Test Result:', result);
            return result;
        } catch (error) {
            console.error('🧪 Test Error:', error);
            return null;
        }
    }
}

const chatServiceInstance = new ChatService();

// Expose to global scope for debugging
if (typeof window !== 'undefined') {
    window.ChatService = chatServiceInstance;
}

export default chatServiceInstance; 