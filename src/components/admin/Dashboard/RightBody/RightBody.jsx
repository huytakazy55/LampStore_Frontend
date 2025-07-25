import React from 'react';
import { useLocation } from 'react-router-dom';
import Category from '../Category-manage/Category';
import RightBodyContent from './RightBodyContent';
import Users from '../Users-manage/Users';
import Products from '../Products-manage/Products';
import Tags from '../Tags-manage/Tags';
import Banners from '../Banner-manage/Banners';
import AdminChatDashboard from '../Chat-manage/AdminChatDashboard';
import Settings from '../Settings-manage/Settings';

const RightBody = () => {
  const location = useLocation();

  const renderContent = () => {
    if (location.pathname === '/admin') 
    {
      return <RightBodyContent />;
    } 
    else if (location.pathname === '/admin/category')
    {
      return <Category />;
    }
    else if (location.pathname === '/admin/tags')
    {
      return <Tags />;
    }
    else if(location.pathname === '/admin/banners')
    {
      return <Banners />;
    }
    else if(location.pathname === '/admin/users')
    {
      return <Users />
    } 
    else if(location.pathname === '/admin/products')
    {
      return <Products />
    }
    else if(location.pathname === '/admin/chat')
    {
      return <AdminChatDashboard />
    }
    else if(location.pathname === '/admin/settings')
    {
      return <Settings />
    }
    return null;
  };

  return (
    <div className='flex-1 h-full rightbody-scroll' style={{height: 'calc(100vh - 4rem)', overflowY: 'auto', overflowX: 'hidden'}}>
      <div className='relative'>
        {renderContent()}
      </div>
    </div>
  );
};

export default RightBody;