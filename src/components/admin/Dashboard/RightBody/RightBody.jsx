import React from 'react';
import './RightBody.css';
import { useLocation } from 'react-router-dom';
import Category from '../Category-manage/Category';
import RightBodyContent from './RightBodyContent';
import Users from '../Users-manage/Users';
import Products from '../Products-manage/Products';

const RightBody = () => {
  const location = useLocation();

  const renderContent = () => {
    if (location.pathname === '/admin') {
      return <RightBodyContent />;
    } else if (location.pathname === '/admin/category') {
      return <Category />;
    } else if(location.pathname === '/admin/users'){
      return <Users />
    } else if(location.pathname === '/admin/products'){
      return <Products />
    }
    return null;
  };

  return (
    <div className='RightBody'>
      <div className='RightBody-content'>
        {renderContent()}
      </div>
    </div>
  );
};

export default RightBody;