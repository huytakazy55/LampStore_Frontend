import React from 'react';
import { useEffect } from 'react';
import AppBar from '../AppBar/AppBar';
import LeftBar from '../LeftBar/LeftBar';
import RightBody from '../RightBody/RightBody';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationService from '../../../../Services/NotificationService';

const AdminDashboard = () => {
  useEffect(() => {
    // Khởi tạo thông báo real-time cho admin
    const initializeNotifications = async () => {
      try {
        await NotificationService.setupSignalRNotifications();
        NotificationService.requestNotificationPermission();
        NotificationService.cleanOldNotifications();
        
        console.log('📢 Admin Dashboard: Notification system initialized');
      } catch (error) {
        console.error('❌ Admin Dashboard: Failed to initialize notifications:', error);
      }
    };

    initializeNotifications();
  }, []);

  return (
    <div>
      <AppBar />
      <div className='h-[calc(100vh-4rem)] flex justify-between items-center'>
        <LeftBar />
        <RightBody />
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
