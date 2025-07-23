import React, { useState, useEffect, useRef } from 'react';
import { Send, Plus, Minimize2, MessageSquare, Clock, CheckCheck } from 'lucide-react';
import ChatService from '../../../Services/ChatService';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages, addMessage } from '../../../redux/slices/chatSlice';

const ChatWindow = ({ onClose }) => {
  const [currentView, setCurrentView] = useState('list'); // 'list' hoặc 'chat'
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const processedMessagesRef = useRef(new Set());

  // New chat form states
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState(2); // Normal = 2
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  // Priority mapping
  const priorityOptions = [
    { value: 1, label: 'Thấp' },
    { value: 2, label: 'Bình thường' },
    { value: 3, label: 'Cao' },
    { value: 4, label: 'Khẩn cấp' }
  ];

  // Redux hooks đặt ở đầu component
  const dispatch = useDispatch();
  const messages = useSelector(state => state.chat.messages[currentChat?.id] || []);

  // Helper functions
  const getCurrentUserId = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No token found for user');
        return null;
      }
      
      // Decode JWT token to get user ID
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.nameid || payload.sub || payload.userId || payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      
      console.log('🔍 User Token Payload:', {
        nameid: payload.nameid,
        sub: payload.sub,
        userId: payload.userId,
        role: payload.role,
        unique_name: payload.unique_name,
        extractedUserId: userId
      });
      
      return userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1: return 'Mở';
      case 2: return 'Đang xử lý';
      case 3: return 'Đã giải quyết';
      case 4: return 'Đã đóng';
      default: return 'Không xác định';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-yellow-100 text-yellow-800';
      case 3: return 'bg-blue-100 text-blue-800';
      case 4: return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority) => {
    const option = priorityOptions.find(p => p.value === priority);
    return option ? option.label : 'Không xác định';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return 'bg-gray-100 text-gray-800';
      case 2: return 'bg-blue-100 text-blue-800';
      case 3: return 'bg-orange-100 text-orange-800';
      case 4: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    loadChats();
    initializeSignalR();
    console.log('ChatWindow initialized - with real-time support');

    // Cleanup function
    return () => {
      ChatService.disconnect();
      removeEventListeners();
    };
  }, []);

  const initializeSignalR = async () => {
    try {
      console.log('🔗 User ChatWindow: Initializing SignalR connection...');
      const connected = await ChatService.initializeConnection();
      if (connected) {
        console.log('✅ User ChatWindow: SignalR connected successfully');
        setupRealTimeListeners();
        
        // Test connection bằng cách kiểm tra user role
        const token = localStorage.getItem('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log('👤 User info:', {
            userId: payload.nameid || payload.sub,
            role: payload.role || 'User',
            userName: payload.unique_name
          });
        }
      } else {
        console.warn('⚠️ User ChatWindow: SignalR connection failed, using API only');
      }
    } catch (error) {
      console.error('❌ User ChatWindow: SignalR initialization error:', error);
    }
  };

  const setupRealTimeListeners = () => {
    // Listen for new messages
    window.addEventListener('newMessage', handleNewMessage);
    
    // Listen for typing indicators  
    window.addEventListener('userTyping', handleUserTyping);
    
    // Listen for message read status
    window.addEventListener('messageRead', handleMessageRead);
  };

  const removeEventListeners = () => {
    window.removeEventListener('newMessage', handleNewMessage);
    window.removeEventListener('userTyping', handleUserTyping);
    window.removeEventListener('messageRead', handleMessageRead);
  };

  const handleNewMessage = (event) => {
    const newMsg = event.detail;
    const targetChatId = newMsg.chatId || newMsg.ChatId;
    
    console.log('👤 User: Received SignalR event:', {
      targetChatId,
      currentChatId: currentChat?.id,
      currentView,
      isMatchingChat: currentChat && targetChatId === currentChat.id,
      fullMessage: newMsg
    });
    
    // Nếu user đang trong chat và tin nhắn thuộc chat hiện tại
    if (currentChat && targetChatId === currentChat.id) {
      const messageId = newMsg.messageId || newMsg.MessageId || newMsg.id;
      const content = newMsg.content || newMsg.Content;
      const senderId = newMsg.senderId || newMsg.SenderId;
      const timestamp = newMsg.timestamp || newMsg.Timestamp || newMsg.createdAt || new Date().toISOString();
      
      console.log('👤 User: Processing message for current chat:', {
        messageId,
        content,
        senderId,
        timestamp
      });
      
      const messageKey = messageId || `${content}_${senderId}_${Math.floor(new Date(timestamp).getTime() / 1000)}`;
      
      if (processedMessagesRef.current.has(messageKey)) {
        console.log('🔄 User: Skipping duplicate message:', messageKey);
        return;
      }
      
      processedMessagesRef.current.add(messageKey);
      setTimeout(() => {
        processedMessagesRef.current.delete(messageKey);
      }, 10000);
      
      let messageType = newMsg.type || newMsg.Type || 1;
      if (typeof messageType === 'string') {
        messageType = messageType.toLowerCase() === 'text' ? 1 : 1;
      }
      
      const messageToAdd = {
        id: messageId || `signalr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        content,
        createdAt: timestamp,
        senderId,
        senderName: newMsg.senderName || newMsg.SenderName,
        isRead: false,
        type: messageType,
        isFromSignalR: true
      };
      
      const exists = messages.some(msg => {
        if (messageId && msg.id === messageId) return true;
        if (msg.content === messageToAdd.content && 
            msg.senderId === messageToAdd.senderId && 
            Math.abs(new Date(msg.createdAt) - new Date(messageToAdd.createdAt)) < 5000) {
          return true;
        }
        return false;
      });
      
      if (!exists) {
        console.log('✅ User: Adding new message to current chat UI:', messageToAdd);
        dispatch(addMessage({ chatId: currentChat.id, message: messageToAdd }));
      } else {
        console.log('⚠️ User: Message already exists, skipping:', messageToAdd.id);
      }
    } 
    // Nếu user không ở trong chat hiện tại nhưng nhận được tin nhắn
    else if (targetChatId) {
      console.log('👤 User: Received message for different/no chat, updating redux only');
      
      const messageId = newMsg.messageId || newMsg.MessageId || newMsg.id;
      const content = newMsg.content || newMsg.Content;
      const senderId = newMsg.senderId || newMsg.SenderId;
      const timestamp = newMsg.timestamp || newMsg.Timestamp || newMsg.createdAt || new Date().toISOString();
      
      let messageType = newMsg.type || newMsg.Type || 1;
      if (typeof messageType === 'string') {
        messageType = messageType.toLowerCase() === 'text' ? 1 : 1;
      }
      
      const messageToAdd = {
        id: messageId || `signalr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        content,
        createdAt: timestamp,
        senderId,
        senderName: newMsg.senderName || newMsg.SenderName,
        isRead: false,
        type: messageType,
        isFromSignalR: true
      };
      
      // Cập nhật vào redux để khi user mở chat sẽ thấy tin nhắn mới
      dispatch(addMessage({ chatId: targetChatId, message: messageToAdd }));
      console.log('✅ User: Added message to redux for chat:', targetChatId);
    } else {
      console.log('👤 User: No targetChatId found in message');
    }
    
    // Always refresh chat list to update last message
    loadChats();
  };

  const handleUserTyping = (event) => {
    const typingData = event.detail;
    
    if (currentChat && typingData.ChatId === currentChat.id) {
      setTypingUsers(prev => {
        if (typingData.IsTyping) {
          return [...prev.filter(u => u !== typingData.UserName), typingData.UserName];
        } else {
          return prev.filter(u => u !== typingData.UserName);
        }
      });
    }
  };

  const handleMessageRead = (event) => {
    const readData = event.detail;
    
    // Update message read status in current view
    if (currentChat && readData.ChatId === currentChat.id) {
      // This part needs to be updated to use redux for messages
      // For now, we'll just reload messages to get the updated status
      loadMessages(currentChat.id);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChats = async () => {
    try {
      setLoading(true);
      const response = await ChatService.getUserChats();
      
      // Handle .NET serialization format {$id: '1', $values: [...]}
      let userChats = response;
      if (response && response.$values && Array.isArray(response.$values)) {
        userChats = response.$values;
      } else if (Array.isArray(response)) {
        userChats = response;
      } else {
        userChats = [];
      }
      
      setChats(userChats);
    } catch (error) {
      setChats([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (chatId) => {
    try {
      const response = await ChatService.getChatMessages(chatId);
      
      // Handle .NET serialization format with references
      let chatMessages = [];
      
      if (response && response.$values && Array.isArray(response.$values)) {
        // Create a map to store objects by their $id
        const objectMap = new Map();
        
        // First pass: collect all objects with $id
        const collectObjects = (obj) => {
          if (typeof obj === 'object' && obj !== null) {
            if (obj.$id) {
              objectMap.set(obj.$id, obj);
            }
            // Recursively collect from nested objects/arrays
            Object.values(obj).forEach(value => {
              if (typeof value === 'object' && value !== null) {
                if (Array.isArray(value)) {
                  value.forEach(collectObjects);
                } else {
                  collectObjects(value);
                }
              }
            });
          }
        };
        
        collectObjects(response);
        
        // Second pass: resolve references in $values array
        chatMessages = response.$values.map(item => {
          if (item.$ref) {
            const resolvedObject = objectMap.get(item.$ref);
            return resolvedObject || item;
          }
          return item;
        }).filter(Boolean);
      } else if (Array.isArray(response)) {
        chatMessages = response;
      } else {
        chatMessages = [];
      }
      
      dispatch(setMessages({ chatId, messages: chatMessages }));
      
      // Join chat room for real-time updates
      await ChatService.joinChat(chatId);
    } catch (error) {
      dispatch(setMessages({ chatId, messages: [] }));
    }
  };

  const openChat = async (chat) => {
    try {
      console.log('👤 User opening chat:', { chatId: chat.id, subject: chat.subject });
      
      // Leave previous chat room if any
      if (currentChat) {
        console.log('👤 User leaving previous chat:', currentChat.id);
        await ChatService.leaveChat(currentChat.id);
      }
      
      setCurrentChat(chat);
      setCurrentView('chat');
      
      // Join new chat room for real-time updates
      console.log('👤 User joining chat room:', chat.id);
      await ChatService.joinChat(chat.id);
      console.log('✅ User successfully joined chat room:', chat.id);
      
      loadMessages(chat.id);
    } catch (error) {
      console.error('❌ User error opening chat:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentChat) return;

    try {
      console.log('👤 User sending message:', { 
        chatId: currentChat.id, 
        content: newMessage.substring(0, 50) + '...',
        chatSubject: currentChat.subject 
      });
      
      await ChatService.sendMessage(currentChat.id, newMessage);
      console.log('✅ User message sent successfully');
      
      setNewMessage('');
      
      // Reload messages to get updated list (will include the new message)
      await loadMessages(currentChat.id);
    } catch (error) {
      console.error('❌ User error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const createNewChat = () => {
    setCurrentView('newChat');
    setSubject('');
    setPriority(2); // Normal = 2
    setDescription('');
  };

  const backToList = () => {
    setCurrentView('list');
    setCurrentChat(null);
    // setMessages([]); // This line is removed as messages are now managed by redux
  };

  const handleCreateChat = async () => {
    if (!subject.trim()) return;

    try {
      setCreating(true);
      const newChat = await ChatService.createChat(subject, priority);
      
      // Gửi tin nhắn đầu tiên nếu có description
      if (description.trim()) {
        await ChatService.sendMessage(newChat.id, description);
      }

      // Refresh chat list và mở chat mới
      await loadChats();
      openChat(newChat);
    } catch (error) {
      // Handle error silently
    } finally {
      setCreating(false);
    }
  };

  // Chat List View
  const renderChatList = () => (
    <div className="flex flex-col h-full">
      {/* Header đẹp */}
      <div style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        color: 'white',
        padding: '0.85rem 1.1rem',
        borderTopLeftRadius: '1rem',
        borderTopRightRadius: '1rem',
        boxShadow: '0 2px 8px 0 rgba(60,60,180,0.10)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        minHeight: '3.1rem',
      }}>
        <h3 style={{margin:0,fontWeight:600,fontSize:'1.08rem',letterSpacing:'0.5px',textShadow:'0 1px 4px rgba(60,60,180,0.10)', color: 'white'}}>Hỗ trợ khách hàng</h3>
        <div style={{display:'flex',gap:'0.5rem'}}>
          <button
            onClick={createNewChat}
            title="Tạo chat mới"
            style={{
              background:'rgba(255,255,255,0.13)',
              border:'none',
              borderRadius:'50%',
              width:'2.1rem',height:'2.1rem',
              display:'flex',alignItems:'center',justifyContent:'center',
              color:'white',
              cursor:'pointer',
              transition:'background 0.18s',
              boxShadow:'0 1px 4px rgba(60,60,180,0.10)'
            }}
            onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.22)'}
            onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.13)'}
          >
            <Plus size={18} />
          </button>
          <button
            onClick={onClose}
            style={{
              background:'rgba(255,255,255,0.13)',
              border:'none',
              borderRadius:'50%',
              width:'2.1rem',height:'2.1rem',
              display:'flex',alignItems:'center',justifyContent:'center',
              color:'white',
              cursor:'pointer',
              transition:'background 0.18s',
              boxShadow:'0 1px 4px rgba(60,60,180,0.10)'
            }}
            onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.22)'}
            onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.13)'}
          >
            <Minimize2 size={18} />
          </button>
        </div>
      </div>
      {/* Chat List */}
      <div className="flex-1 chat-scrollable">
        {loading ? (
          <div className="p-4 text-center text-gray-500">Đang tải...</div>
        ) : chats.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <MessageSquare size={48} className="mx-auto mb-2 text-gray-300" />
            <p>Chưa có cuộc trò chuyện nào</p>
            <button
              onClick={createNewChat}
              className="mt-2 text-blue-600 hover:text-blue-800"
            >
              Tạo chat hỗ trợ mới
            </button>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => openChat(chat)}
              className="p-3 border-b hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{chat.subject}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {chat.lastMessage ? (chat.lastMessage.content || chat.lastMessage.Content) : 'Chưa có tin nhắn'}
                  </p>
                </div>
                <div className="text-xs text-gray-400 ml-2">
                  <Clock size={12} className="inline mr-1" />
                  {new Date(chat.lastMessageAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(chat.status)}`}>
                  {getStatusText(chat.status)}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(chat.priority)}`}>
                  {getPriorityText(chat.priority)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  // Chat View
  const renderChatView = () => (
    <div className="flex flex-col h-full">
      {/* Header đẹp */}
      <div style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        color: 'white',
        padding: '0.85rem 1.1rem',
        borderTopLeftRadius: '1rem',
        borderTopRightRadius: '1rem',
        boxShadow: '0 2px 8px 0 rgba(60,60,180,0.10)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        minHeight: '3.1rem',
      }}>
        <div style={{display:'flex',alignItems:'center'}}>
          <button
            onClick={backToList}
            style={{
              marginRight:'0.7rem',
              background:'rgba(255,255,255,0.13)',
              border:'none',
              borderRadius:'50%',
              width:'2.1rem',height:'2.1rem',
              display:'flex',alignItems:'center',justifyContent:'center',
              color:'white',
              cursor:'pointer',
              transition:'background 0.18s',
              boxShadow:'0 1px 4px rgba(60,60,180,0.10)'
            }}
            onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.22)'}
            onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.13)'}
          >
            ←
          </button>
          <div style={{flex:1}}>
            <h3 style={{margin:0,fontWeight:600,fontSize:'1.02rem',letterSpacing:'0.2px',textShadow:'0 1px 4px rgba(60,60,180,0.10)'}}>{currentChat?.subject}</h3>
            <p style={{fontSize:'0.82rem',opacity:0.8,margin:0}}>
              {currentChat?.assignedAdmin ? `Admin: ${currentChat.assignedAdmin.userName}` : 'Chờ admin phản hồi'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background:'rgba(255,255,255,0.13)',
            border:'none',
            borderRadius:'50%',
            width:'2.1rem',height:'2.1rem',
            display:'flex',alignItems:'center',justifyContent:'center',
            color:'white',
            cursor:'pointer',
            transition:'background 0.18s',
            boxShadow:'0 1px 4px rgba(60,60,180,0.10)'
          }}
          onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.22)'}
          onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.13)'}
        >
          <Minimize2 size={18} />
        </button>
      </div>
      {/* Messages */}
      <div className="flex-1 chat-scrollable p-4 space-y-3">
        {Array.isArray(messages) && messages.length > 0 ? messages.map((message) => {
          const currentUserId = getCurrentUserId();
          const isFromCurrentUser = message.senderId === currentUserId;
          const isFromAdmin = !isFromCurrentUser;
          return (
            <div
              key={message.id}
              className={`flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
                {isFromAdmin && (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    A
                  </div>
                )}
                <div className={`px-3 py-2 rounded-lg ${
                  isFromCurrentUser
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}>
                  {isFromAdmin && (
                    <p className="text-xs font-semibold text-green-600 mb-1">
                      🛡️ Admin Support
                    </p>
                  )}
                  <p className="text-sm">{message.content || message.Content}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs opacity-75">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                    {isFromCurrentUser && (
                      <span className="text-xs opacity-75">
                        {message.isRead ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>
                {isFromCurrentUser && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    U
                  </div>
                )}
              </div>
            </div>
          );
        }) : (
          <div className="text-center text-gray-500 py-8">
            <p>Chưa có tin nhắn nào</p>
            <p className="text-sm">Hãy gửi tin nhắn đầu tiên!</p>
          </div>
        )}
        {typingUsers.length > 0 && (
          <div className="flex justify-start">
            <div className="bg-gray-200 px-3 py-2 rounded-lg">
              <p className="text-xs text-gray-600">
                {typingUsers.join(', ')} đang gõ...
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t">
        <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn..."
            className="chat-input flex-1"
            style={{minWidth:'0'}}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="chat-send-btn"
            style={{display:'flex',alignItems:'center',justifyContent:'center'}}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )

  // Debug functions for development  
  const debugSignalR = () => {
    console.log('🔍 User Chat Debug Info:', {
      isConnected: ChatService.isConnected,
      connectionState: ChatService.connection?.state,
      currentChatId: currentChat?.id,
      hasToken: !!localStorage.getItem('token')
    });
  };

  const testSignalRConnection = async () => {
    try {
      console.log('🧪 Testing SignalR connection...');
      const result = await ChatService.testConnection();
      console.log('🧪 Connection test result:', result);
    } catch (error) {
      console.error('🧪 Connection test failed:', error);
    }
  };

  // New Chat View
  const renderNewChatView = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={backToList}
            className="mr-3 hover:bg-blue-700 p-1 rounded"
          >
            ←
          </button>
          <h3 className="font-semibold">Tạo yêu cầu hỗ trợ mới</h3>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-blue-700 p-1 rounded"
        >
          <Minimize2 size={20} />
        </button>
      </div>
      {/* Form */}
      <div className="flex-1 p-4 space-y-4"> 
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiêu đề <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Mô tả ngắn gọn vấn đề của bạn"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mức độ ưu tiên
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả chi tiết
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
            rows={4}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleCreateChat}
          disabled={!subject.trim() || creating}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {creating ? 'Đang tạo...' : 'Tạo yêu cầu hỗ trợ'}
        </button>
      </div>
    </div>
  )

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '0',
        right: '30px',
        width: '21rem',
        height: '30rem',
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 6px 18px 0 rgba(60,60,180,0.13), 0 0 0 2.5px rgba(37,99,235,0.08)',
        borderImage: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%) 1',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'all 0.32s cubic-bezier(.4,2,.6,1)',
        animation: 'chatWindowSlideIn 0.38s cubic-bezier(.4,2,.6,1)',
      }}
      onWheel={e => e.stopPropagation()}
      tabIndex={0}
    >
      <style>{`
        @keyframes chatWindowSlideIn {
          0% { opacity: 0; transform: translateY(60px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chat-send-btn {
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          color: white;
          border-radius: 12px;
          padding: 0.35rem 0.8rem;
          font-weight: 600;
          font-size: 0.95rem;
          border: none;
          box-shadow: 0 1.5px 5px rgba(37,99,235,0.10);
          transition: all 0.18s cubic-bezier(.4,2,.6,1);
        }
        .chat-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .chat-send-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
          box-shadow: 0 2.5px 8px rgba(124,58,237,0.13);
          transform: scale(1.06);
        }
        .chat-input {
          border-radius: 12px;
          border: 1.2px solid #e0e7ef;
          padding: 0.38rem 0.8rem;
          font-size: 0.97rem;
          outline: none;
          transition: border 0.2s;
        }
        .chat-input:focus {
          border: 1.2px solid #7c3aed;
          box-shadow: 0 0 0 1.5px #e0e7ef;
        }
        .chat-scrollable {
          overflow-y: auto !important;
          overscroll-behavior: contain !important;
        }
      `}</style>
      {currentView === 'list' && renderChatList()}
      {currentView === 'chat' && (
        <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
          {/* Header giữ nguyên */}
          {renderChatView()}
        </div>
      )}
      {currentView === 'newChat' && renderNewChatView()}
    </div>
  )
}
export default ChatWindow