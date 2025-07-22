import store from '../redux/store';
import { addNotification, initNotifications, markAsRead } from '../redux/slices/notificationSlice';
import AudioService from './AudioService';

class NotificationService {
  constructor() {
    this.storageKey = 'chat_notifications';
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

  // Tạo thông báo tin nhắn mới
  createChatNotification(messageData) {
    const currentUser = this.getCurrentUserInfo();
    if (!currentUser) return;

    // Phân biệt admin và user
    const isAdmin = currentUser.role === 'Administrator' || currentUser.role === 'Admin';
    const isFromCurrentUser = messageData.senderId === currentUser.id;

    // Chỉ tạo thông báo nếu tin nhắn không phải từ user hiện tại
    if (isFromCurrentUser) return;

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

    // Phát âm thanh thông báo
    this.playNotificationSound(notificationData);

    // Hiển thị browser notification nếu được phép
    this.showBrowserNotification(notificationData);
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
      
      console.log(`🔊 Playing notification sound: ${soundType} for ${isAdmin ? 'admin' : 'user'}`);
    } catch (error) {
      console.error('Error playing notification sound:', error);
    }
  }

  // Hiển thị browser notification
  showBrowserNotification(notification) {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: `chat-${notification.chatId}`,
          requireInteraction: false,
          silent: false
        });
      } catch (error) {
        console.error('Error showing browser notification:', error);
      }
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

  // Khởi tạo listener cho SignalR
  setupSignalRNotifications() {
    // Lắng nghe sự kiện tin nhắn mới từ SignalR
    window.addEventListener('newMessage', (event) => {
      const messageData = event.detail;
      this.createChatNotification(messageData);
    });

    console.log('📢 NotificationService: SignalR listeners setup completed');
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
}

// Tạo instance duy nhất
const notificationService = new NotificationService();

export default notificationService; 