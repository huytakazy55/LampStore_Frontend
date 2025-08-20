import store from '../redux/store';
import { addNotification, initNotifications, markAsRead } from '../redux/slices/notificationSlice';
import AudioService from './AudioService';
import ChatService from './ChatService';

class NotificationService {
  constructor() {
    this.storageKey = 'chat_notifications';
    this.signalRInitialized = false;
    this.hasSetupListeners = false; // Thêm flag để tránh addEventListener nhiều lần
    this.init();
  }

  // Khởi tạo thông báo từ localStorage
  init() {
    try {
      const savedNotifications = localStorage.getItem(this.storageKey);
      if (savedNotifications) {
        const parsed = JSON.parse(savedNotifications);
        store.dispatch(initNotifications(parsed));
      }
    } catch (error) {
      console.error('Error loading notifications from storage:', error);
    }
  }

  // Lưu thông báo vào localStorage
  saveToStorage() {
    try {
      const state = store.getState().notification;
      const dataToSave = {
        notifications: state.notifications,
        unreadCount: state.unreadCount
      };
      localStorage.setItem(this.storageKey, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving notifications to storage:', error);
    }
  }

  // Lấy thông tin user hiện tại
  getCurrentUserInfo() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.nameid || payload.sub || payload.userId || payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        role: payload.role || 'User',
        name: payload.unique_name || 'User'
      };
    } catch (error) {
      console.error('Error getting user info:', error);
      return null;
    }
  }

  // Khởi tạo kết nối SignalR cho thông báo
  async initializeSignalRConnection() {
    try {
      const currentUser = this.getCurrentUserInfo();
      if (!currentUser) {
        console.warn('📢 NotificationService: No user token, skipping SignalR connection');
        return false;
      }

      console.log('📢 NotificationService: Initializing SignalR connection for user:', currentUser.name, 'Role:', currentUser.role);
      
      // Sử dụng ChatService để kết nối SignalR
      const connected = await ChatService.initializeConnection();
      
      if (connected) {
        this.signalRInitialized = true;
        console.log('✅ NotificationService: SignalR connected successfully for notifications');
        
        // Thêm delay nhỏ để đảm bảo connection ổn định
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Test connection bằng cách gửi ping
        try {
          const testResult = await ChatService.testConnection();
          console.log('🧪 NotificationService: Connection test result:', testResult);
        } catch (testError) {
          console.warn('⚠️ NotificationService: Connection test failed:', testError);
        }
        
        return true;
      } else {
        console.warn('⚠️ NotificationService: SignalR connection failed');
        return false;
      }
    } catch (error) {
      console.error('❌ NotificationService: SignalR connection error:', error);
      return false;
    }
  }

  // Tạo thông báo tin nhắn mới
  createChatNotification(messageData) {
    
    const currentUser = this.getCurrentUserInfo();
    if (!currentUser) {
      console.warn('📢 NotificationService: No current user, cannot create notification');
      return;
    }

    // Phân biệt admin và user
    const isAdmin = currentUser.role === 'Administrator' || currentUser.role === 'Admin';
    const isFromCurrentUser = (messageData.SenderId || messageData.senderId) === currentUser.id;

    // Chỉ tạo thông báo nếu tin nhắn không phải từ user hiện tại
    if (isFromCurrentUser) {
      return;
    }

    let title, message, priority;

    if (isAdmin) {
      // Thông báo cho admin: có tin nhắn mới từ user
      title = `Tin nhắn mới từ khách hàng`;
      message = `${messageData.senderName || 'Khách hàng'}: ${messageData.content}`;
      priority = this.getChatPriority(messageData.priority);
    } else {
      // Thông báo cho user: có phản hồi từ admin
      title = `Phản hồi từ hỗ trợ`;
      message = `Admin: ${messageData.content}`;
      priority = 'high'; // Phản hồi admin luôn ưu tiên cao
    }

    const notification = {
      type: 'chat',
      title,
      message: message.length > 100 ? message.substring(0, 100) + '...' : message,
      chatId: messageData.chatId,
      userId: currentUser.id,
      userRole: currentUser.role,
      priority,
      createdAt: messageData.createdAt || new Date().toISOString(),
      avatar: messageData.senderAvatar
    };

    this.addNotification(notification);
  }

  // Thêm thông báo mới
  addNotification(notificationData) {
    
    store.dispatch(addNotification(notificationData));
    
    this.saveToStorage();

    // Phát âm thanh thông báo (luôn chạy)
    this.playNotificationSound(notificationData);

    // Hiển thị browser notification nếu được phép
    this.showBrowserNotification(notificationData);
    
    // Fallback: Hiển thị in-app notification nếu browser notification bị từ chối
    this.showInAppNotification(notificationData);
    
  }

  // Phát âm thanh thông báo
  playNotificationSound(notification) {
    try {
      const currentUser = this.getCurrentUserInfo();
      if (!currentUser) return;

      const isAdmin = currentUser.role === 'Administrator' || currentUser.role === 'Admin';
      
      // Chọn loại âm thanh dựa trên role và loại thông báo
      let soundType = 'notification';
      
      if (notification.type === 'chat') {
        if (isAdmin) {
          // Admin nhận tin nhắn từ user
          soundType = 'chat_received';
        } else {
          // User nhận phản hồi từ admin  
          soundType = 'chat_received';
        }
      }

      // Phát âm thanh với priority
      AudioService.playNotificationSound(soundType);
      
    } catch (error) {
      console.error('Error playing notification sound:', error);
    }
  }

  // Hiển thị browser notification
  showBrowserNotification(notification) {
    console.log('🔔 NotificationService: Checking browser notification permission...');
    console.log('🔔 Notification API available:', 'Notification' in window);
    console.log('🔔 Permission status:', Notification.permission);
    
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        console.log('🔔 NotificationService: Creating browser notification...');
        const browserNotification = new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: `chat-${notification.chatId}`,
          requireInteraction: false,
          silent: false
        });
        
        console.log('✅ NotificationService: Browser notification created successfully');
        
        // Auto close after 5 seconds
        setTimeout(() => {
          browserNotification.close();
        }, 5000);
        
      } catch (error) {
        console.error('❌ NotificationService: Error showing browser notification:', error);
      }
    } else {
      console.warn('⚠️ NotificationService: Cannot show browser notification - permission not granted or API not available');
      if (Notification.permission === 'denied') {
        console.warn('⚠️ Browser notifications are BLOCKED. User needs to enable them manually.');
      }
    }
  }

  // Hiển thị in-app notification (fallback)
  showInAppNotification(notification) {
    console.log('📱 NotificationService: Showing in-app notification...');
    
    try {
      // Tạo toast notification bằng React-Toastify
      if (typeof window !== 'undefined' && window.toast) {
        const toastContent = `${notification.title}: ${notification.message}`;
        window.toast.info(toastContent, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log('✅ NotificationService: Toast notification shown');
      } else {
        // Fallback: console notification
        console.log(`🔔 IN-APP NOTIFICATION: ${notification.title} - ${notification.message}`);
      }
      
      // Dispatch custom event cho các component khác (như AdminChatDashboard) 
      window.dispatchEvent(new CustomEvent('inAppNotification', { 
        detail: notification 
      }));
      
    } catch (error) {
      console.error('❌ NotificationService: Error showing in-app notification:', error);
    }
  }

  // Yêu cầu quyền thông báo browser
  async requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
      }
    }
    return Notification.permission === 'granted';
  }

  // Chuyển đổi mức độ ưu tiên chat
  getChatPriority(chatPriority) {
    switch (chatPriority) {
      case 1: return 'low';
      case 2: return 'normal';
      case 3: return 'high';
      case 4: return 'urgent';
      default: return 'normal';
    }
  }

  // Xóa thông báo cũ (giữ lại 7 ngày)
  cleanOldNotifications() {
    const state = store.getState().notification;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const filteredNotifications = state.notifications.filter(notification => {
      return new Date(notification.createdAt) > sevenDaysAgo;
    });

    if (filteredNotifications.length !== state.notifications.length) {
      const unreadCount = filteredNotifications.filter(n => !n.isRead).length;
      store.dispatch(initNotifications({
        notifications: filteredNotifications,
        unreadCount
      }));
      this.saveToStorage();
    }
  }

  // Hàm lấy notification missed khi vừa đăng nhập (chỉ cho admin)
  async fetchMissedChatNotifications() {
    const currentUser = this.getCurrentUserInfo();
    if (!currentUser || !(currentUser.role === 'Administrator' || currentUser.role === 'Admin')) return;

    try {
      // Lấy tất cả chat
      const allChats = await ChatService.getAllChats();
      const chatList = allChats?.$values || allChats || [];
      // Lấy notification đã có
      const state = store.getState().notification;
      const notifiedChatIds = new Set(state.notifications.filter(n => n.type === 'chat').map(n => n.chatId));

      chatList.forEach(chat => {
        // Lấy tin nhắn cuối cùng
        const lastMsg = chat.messages?.$values ? chat.messages.$values[chat.messages.$values.length - 1] : (chat.messages ? chat.messages[chat.messages.length - 1] : null);
        if (!lastMsg) return;
        // Nếu tin nhắn chưa đọc, không phải do admin gửi, và chưa có notification
        if (!lastMsg.isRead && lastMsg.senderId !== currentUser.id && !notifiedChatIds.has(chat.id)) {
          this.createChatNotification({
            chatId: chat.id,
            senderId: lastMsg.senderId,
            senderName: lastMsg.sender?.userName || 'Khách hàng',
            content: lastMsg.content,
            createdAt: lastMsg.createdAt,
            priority: chat.priority,
            senderAvatar: lastMsg.sender?.avatar || undefined
          });
        }
      });
    } catch (error) {
      console.error('Error fetching missed chat notifications:', error);
    }
  }

  // Khởi tạo listener cho SignalR
  async setupSignalRNotifications() {
    // Bổ sung: lấy missed notification trước khi lắng nghe signalR
    await this.fetchMissedChatNotifications();

    // Tự động khởi tạo và đảm bảo kết nối SignalR với retry logic
    const maxRetries = 5;
    let retryCount = 0;
    let isConnectionReady = false;
    
    while (retryCount < maxRetries && !isConnectionReady) {
      try {
        // Khởi tạo SignalR connection
        const connected = await this.initializeSignalRConnection();
        
        if (connected) {
          // Đảm bảo admin join group admins nếu là admin
          const currentUser = this.getCurrentUserInfo();
          if (currentUser && (currentUser.role === 'Administrator' || currentUser.role === 'Admin')) {
            // Retry join admin group với delay
            let joinRetries = 3;
            let joinSuccess = false;
            
            while (joinRetries > 0 && !joinSuccess) {
              try {
                // Thêm delay để đảm bảo connection ổn định
                await new Promise(resolve => setTimeout(resolve, 1000));
                joinSuccess = await ChatService.joinAdminsGroupIfAdmin();
                
                if (joinSuccess) {
                  break;
                } else {
                  joinRetries--;
                  if (joinRetries > 0) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                  }
                }
              } catch (error) {
                console.error('Error joining admin group:', error);
                joinRetries--;
                if (joinRetries > 0) {
                  await new Promise(resolve => setTimeout(resolve, 2000));
                }
              }
            }
          }
          
          // Test connection để đảm bảo hoạt động tốt
          try {
            const testResult = await ChatService.testConnection();
            isConnectionReady = true;
          } catch (testError) {
            isConnectionReady = connected; // Vẫn coi như ok nếu connected
          }
        }
        
        if (isConnectionReady) {
          break;
        }
        
        retryCount++;
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryCount * 2000));
        }
      } catch (error) {
        console.error(`NotificationService setup attempt ${retryCount + 1} failed:`, error);
        retryCount++;
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryCount * 2000));
        }
      }
    }
    
    if (!isConnectionReady) {
      console.error('Failed to setup SignalR after all retries');
      return false;
    }

    // Bây giờ mới setup event listeners khi đã đảm bảo connection sẵn sàng
    if (!this.hasSetupListeners) {
      this.hasSetupListeners = true;

      // Tạo bound function để có thể remove sau này
      this.boundMessageHandler = (event) => {
        const messageData = event.detail;
        const currentUser = this.getCurrentUserInfo();
        if (!currentUser) return;

        const isAdmin = currentUser.role === 'Administrator' || currentUser.role === 'Admin';
        const isFromCurrentUser = (messageData.SenderId || messageData.senderId) === currentUser.id;

        // Nếu là admin và tin nhắn không phải do mình gửi thì tạo notification
        if (isAdmin && !isFromCurrentUser) {
          this.createChatNotification({
            chatId: messageData.ChatId || messageData.chatId,
            senderId: messageData.SenderId || messageData.senderId,
            senderName: messageData.UserName || messageData.SenderName || messageData.senderName || 'Khách hàng',
            content: messageData.Content || messageData.content,
            createdAt: messageData.Timestamp || messageData.timestamp || messageData.createdAt,
            priority: messageData.Priority || messageData.priority,
            subject: messageData.ChatSubject,
            senderAvatar: messageData.SenderAvatar || messageData.senderAvatar || undefined
          });
        } else if (!isAdmin && !isFromCurrentUser) {
          // User nhận phản hồi từ admin
          this.createChatNotification(messageData);
        }
      };

      // Lắng nghe sự kiện tin nhắn mới từ SignalR
      window.addEventListener('newMessage', this.boundMessageHandler);
    }

    
    return true;
  }

  // Thêm method để reset setup state khi cần thiết
  resetSetupState() {
    // Remove existing event listener if any
    if (this.boundMessageHandler) {
      window.removeEventListener('newMessage', this.boundMessageHandler);
      this.boundMessageHandler = null;
    }
    this.hasSetupListeners = false;
    this.signalRInitialized = false;
  }

  // Thêm method để force reconnect và setup lại
  async forceReconnectAndSetup() {
    // Reset state
    this.resetSetupState();
    
    // Force reconnect ChatService
    try {
      await ChatService.disconnect();
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.warn('Warning disconnecting ChatService:', error);
    }
    
    // Setup lại từ đầu
    return await this.setupSignalRNotifications();
  }

  // Test thông báo (chỉ để demo)
  addTestNotification() {
    const currentUser = this.getCurrentUserInfo();
    if (!currentUser) return;

    const isAdmin = currentUser.role === 'Administrator' || currentUser.role === 'Admin';
    
    const testNotification = {
      type: 'chat',
      title: isAdmin ? 'Tin nhắn mới từ khách hàng' : 'Phản hồi từ hỗ trợ',
      message: isAdmin ? 'Khách hàng vừa gửi tin nhắn: "Xin chào, tôi cần hỗ trợ về sản phẩm"' : 'Admin: "Chào bạn! Chúng tôi sẵn sàng hỗ trợ bạn"',
      chatId: 'test-chat-' + Date.now(),
      userId: currentUser.id,
      userRole: currentUser.role,
      priority: 'normal',
      createdAt: new Date().toISOString()
    };

    this.addNotification(testNotification);
  }

  // Đánh dấu tất cả thông báo chat đã đọc khi mở chat
  markChatNotificationsAsRead(chatId) {
    const state = store.getState().notification;
    const chatNotifications = state.notifications.filter(n => 
      n.type === 'chat' && (!chatId || n.chatId === chatId) && !n.isRead
    );

    chatNotifications.forEach(notification => {
      store.dispatch(markAsRead(notification.id));
    });

    if (chatNotifications.length > 0) {
      this.saveToStorage();
    }
  }

  // Kiểm tra trạng thái SignalR
  isSignalRConnected() {
    return this.signalRInitialized && ChatService.isConnected;
  }

  // Reconnect SignalR nếu cần
  async reconnectSignalR() {
    if (!this.isSignalRConnected()) {
      console.log('📢 NotificationService: Reconnecting SignalR...');
      return await this.initializeSignalRConnection();
    }
    return true;
  }

  // Debug connection status
  debugConnection() {
    const currentUser = this.getCurrentUserInfo();
    const connectionInfo = {
      hasToken: !!localStorage.getItem('token'),
      currentUser: currentUser,
      signalRInitialized: this.signalRInitialized,
      chatServiceConnected: ChatService.isConnected,
      connectionState: ChatService.connection?.state,
      apiEndpoint: process.env.REACT_APP_API_ENDPOINT
    };
    
    console.log('🔍 NotificationService Debug Info:', connectionInfo);
    return connectionInfo;
  }

  // Force reconnect (for debugging)
  async forceReconnect() {
    console.log('🔄 NotificationService: Force reconnecting...');
    this.signalRInitialized = false;
    ChatService.isConnected = false;
    
    if (ChatService.connection) {
      try {
        await ChatService.connection.stop();
      } catch (error) {
        console.warn('Warning stopping connection:', error);
      }
      ChatService.connection = null;
    }
    
    return await this.setupSignalRNotifications();
  }

  // Audio settings methods
  setAudioEnabled(enabled) {
    AudioService.setEnabled(enabled);
  }

  setAudioVolume(volume) {
    AudioService.setVolume(volume);
  }

  getAudioSettings() {
    return AudioService.getSettings();
  }

  testNotificationSound() {
    AudioService.testSound('notification');
  }

  // Debug function để check event listeners
  checkEventListeners() {
    console.log('🔍 Checking event listeners...');
    
    // Test manual event dispatch
    console.log('🧪 Testing manual newMessage event dispatch...');
    const testEvent = new CustomEvent('newMessage', {
      detail: {
        ChatId: 'manual-test-123',
        SenderId: 'manual-user-456', 
        UserName: 'Manual Test User',
        SenderName: 'Manual Test User',
        Content: 'Manual test message to check event listener',
        Timestamp: new Date().toISOString(),
        Type: 'Text',
        ChatSubject: 'Manual Test Subject',
        Priority: 2
      }
    });
    
    console.log('🧪 Dispatching manual event...');
    window.dispatchEvent(testEvent);
    console.log('🧪 Manual event dispatched');
    
    return true;
  }

  // Test function để debug notification system
  testAdminNotificationSystem() {
    console.log('🧪 Testing admin notification system...');
    
    // 1. Kiểm tra user role
    const currentUser = this.getCurrentUserInfo();
    console.log('🧪 Current user:', currentUser);
    
    if (!currentUser) {
      console.error('❌ No current user found');
      return false;
    }
    
    const isAdmin = currentUser.role === 'Administrator' || currentUser.role === 'Admin';
    console.log('🧪 Is admin?', isAdmin);
    
    if (!isAdmin) {
      console.warn('⚠️ User is not admin, cannot test admin notifications');
      return false;
    }
    
    // 2. Test manual newMessage event
    console.log('🧪 Dispatching manual newMessage event...');
    const testMessage = {
      ChatId: 'test-chat-123',
      SenderId: 'test-user-456',
      UserName: 'Test User',
      SenderName: 'Test User',
      Content: 'This is a test message from user to admin',
      Timestamp: new Date().toISOString(),
      Type: 'Text',
      ChatSubject: 'Test Chat Subject',
      Priority: 2
    };
    
    window.dispatchEvent(new CustomEvent('newMessage', { detail: testMessage }));
    
    // 3. Test direct notification creation
    console.log('🧪 Creating direct test notification...');
    this.createChatNotification({
      chatId: 'test-direct-789',
      senderId: 'test-user-direct',
      senderName: 'Direct Test User',
      content: 'Direct test notification message',
      createdAt: new Date().toISOString(),
      priority: 3,
      subject: 'Direct Test Subject'
    });
    
    // 4. Test audio service
    console.log('🧪 Testing audio service...');
    try {
      AudioService.playNotificationSound('chat_received');
      console.log('✅ Audio test completed');
    } catch (error) {
      console.error('❌ Audio test failed:', error);
    }
    
    // 5. Test notification permissions
    console.log('🧪 Testing notification permissions...');
    console.log('Permission status:', Notification.permission);
    if (Notification.permission === 'denied') {
      console.warn('⚠️ Browser notifications are BLOCKED!');
      console.log('📱 Testing fallback in-app notification...');
      this.showInAppNotification({
        type: 'chat',
        title: 'Test Fallback Notification',
        message: 'This is a fallback notification because browser notifications are blocked',
        chatId: 'test-fallback',
        priority: 'normal'
      });
    }
    
    return true;
  }

  // Test SignalR admin group membership
  async testAdminGroupMembership() {
    console.log('🧪 Testing admin group membership...');
    
    try {
      const result = await ChatService.joinAdminsGroupIfAdmin();
      console.log('🧪 Admin group join result:', result);
      
      // Test SignalR connection
      const debugInfo = ChatService.debugConnection ? ChatService.debugConnection() : this.debugConnection();
      console.log('🧪 SignalR debug info:', debugInfo);
      
      return result;
    } catch (error) {
      console.error('❌ Admin group test failed:', error);
      return false;
    }
  }
}

// Tạo instance duy nhất
const notificationService = new NotificationService();

// Expose to global scope for debugging
if (typeof window !== 'undefined') {
  window.NotificationService = notificationService;
  window.testAdminNotification = () => notificationService.testAdminNotificationSystem();
  window.testAdminGroup = () => notificationService.testAdminGroupMembership();
  window.checkEventListeners = () => notificationService.checkEventListeners();
}

export default notificationService; 