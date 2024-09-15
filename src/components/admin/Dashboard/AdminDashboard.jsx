import React from 'react';
import AppBar from './AppBar';
import LeftBar from './LeftBar';
import RightBody from './RightBody';
import './AdminDashboard.css'

const AdminDashboard = () => {
  return (
    <div>
      <AppBar />
      <div className='Admin-body'>
        <LeftBar />
        <RightBody />
      </div>
    </div>
  );
};

export default AdminDashboard;
