import React from 'react';
import './RightBody.css';
import { useLocation } from 'react-router-dom';
import Category from '../Category/Category';
import RightBodyContent from './RightBodyContent';

const RightBody = () => {
  const location = useLocation();

  const renderContent = () => {
    if (location.pathname === '/admin') {
      return <RightBodyContent />;
    } else if (location.pathname === '/admin/category') {
      return <Category />;
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