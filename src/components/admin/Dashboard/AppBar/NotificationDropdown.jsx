import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  markAsRead, 
  markAllAsRead, 
  setDropdownOpen, 
  removeNotification 
} from '../../../../redux/slices/notificationSlice';
import NotificationService from '../../../../Services/NotificationService';

const NotificationDropdown = ({ themeColors }) => {
  const dispatch = useDispatch();
  const { notifications, unreadCount, isDropdownOpen } = useSelector(state => state.notification);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [audioSettings, setAudioSettings] = useState({ isEnabled: true, volume: 0.7 });

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        dispatch(setDropdownOpen(false));
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dispatch]);

  // Load audio settings khi component mount
  useEffect(() => {
    const settings = NotificationService.getAudioSettings();
    setAudioSettings(settings);
  }, []);

  const toggleDropdown = () => {
    dispatch(setDropdownOpen(!isDropdownOpen));
  };

  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  const handleMarkAllAsRead = (event) => {
    event.stopPropagation(); // Ngăn event bubbling
    dispatch(markAllAsRead());
  };

  const handleRemoveNotification = (notificationId) => {
    dispatch(removeNotification(notificationId));
  };

  const handleToggleAudio = () => {
    const newEnabled = !audioSettings.isEnabled;
    NotificationService.setAudioEnabled(newEnabled);
    setAudioSettings(prev => ({ ...prev, isEnabled: newEnabled }));
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    NotificationService.setAudioVolume(newVolume);
    setAudioSettings(prev => ({ ...prev, volume: newVolume }));
  };

  const handleTestSound = () => {
    NotificationService.testNotificationSound();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'chat':
        return '💬';
      case 'order':
        return '📦';
      case 'system':
        return '⚙️';
      default:
        return '🔔';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return '#ef4444';
      case 'high':
        return '#f97316';
      case 'normal':
        return '#3b82f6';
      case 'low':
        return '#6b7280';
      default:
        return '#3b82f6';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return time.toLocaleDateString('vi-VN');
  };

  return (
    <div className="relative">
      {/* Bell Icon với Badge */}
      <div 
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex relative cursor-pointer transition-transform duration-200 hover:scale-110"
        style={{
          filter: isDropdownOpen ? 'drop-shadow(0 0 8px rgba(59,130,246,0.4))' : 'none'
        }}
      >
        <i className="bx bx-bell text-h2 mt-1"></i>
        
        {/* Badge số lượng thông báo */}
        {unreadCount > 0 && (
          <div 
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse"
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              boxShadow: '0 2px 8px rgba(239,68,68,0.3)'
            }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-10 right-0 w-80 max-h-96 bg-white rounded-xl shadow-2xl border z-[1000] overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: `2px solid ${themeColors.StartColorLinear}20`,
            animation: 'slideInDown 0.3s ease-out'
          }}
        >
          <style jsx>{`
            @keyframes slideInDown {
              0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          {/* Header */}
          <div 
            className="p-4 border-b"
            style={{
              background: `linear-gradient(135deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`,
              color: 'white'
            }}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm">Thông báo ({unreadCount})</h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
                >
                  Đánh dấu tất cả
                </button>
              )}
            </div>
          </div>

          {/* Danh sách thông báo */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <i className="bx bx-bell-off text-4xl mb-2"></i>
                <p className="text-sm">Không có thông báo nào</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? 'bg-blue-50/50' : ''
                  }`}
                  onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                      style={{ backgroundColor: getPriorityColor(notification.priority) + '20' }}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Nội dung */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm text-gray-900 truncate">
                          {notification.title}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveNotification(notification.id);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <i className="bx bx-x text-sm"></i>
                        </button>
                      </div>
                      
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-400">
                          {formatTime(notification.createdAt)}
                        </span>
                        
                        {!notification.isRead && (
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getPriorityColor(notification.priority) }}
                          ></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer với Audio Controls */}
          <div className="p-3 border-t bg-gray-50">
            {/* Audio Controls */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Âm thanh thông báo</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTestSound}
                    className="text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
                  >
                    🔊 Test
                  </button>
                  <button
                    onClick={handleToggleAudio}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      audioSettings.isEnabled
                        ? 'bg-green-100 hover:bg-green-200 text-green-700'
                        : 'bg-red-100 hover:bg-red-200 text-red-700'
                    }`}
                  >
                    {audioSettings.isEnabled ? '🔊 Bật' : '🔇 Tắt'}
                  </button>
                </div>
              </div>
              
              {audioSettings.isEnabled && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Âm lượng:</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={audioSettings.volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-gray-500 w-8">
                    {Math.round(audioSettings.volume * 100)}%
                  </span>
                </div>
              )}
            </div>
            
            {/* Xem tất cả link */}
            {notifications.length > 0 && (
              <div className="text-center border-t pt-2">
                <button 
                  className="text-xs text-gray-600 hover:text-gray-800 transition-colors"
                  style={{ color: themeColors.StartColorLinear }}
                >
                  Xem tất cả thông báo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown; 