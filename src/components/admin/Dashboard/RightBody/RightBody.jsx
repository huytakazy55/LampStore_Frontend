import React from 'react';
import { useLocation } from 'react-router-dom';
import Category from '../Category-manage/Category';
import RightBodyContent from './RightBodyContent';
import Users from '../Users-manage/Users';
import Products from '../Products-manage/Products';

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
    else if(location.pathname === '/admin/users')
    {
      return <Users />
    } 
    else if(location.pathname === '/admin/products')
    {
      return <Products />
    }
    return null;
  };

  return (
    <div className='flex-1 h-full py-2 px-8'>
      <div className='relative'>
        {renderContent()}
      </div>
    </div>
  );
};

export default RightBody;