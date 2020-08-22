import React from 'react';
import { useLocation } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import AuthSlider from '../../components/AuthSlider/AuthSlider';

import './index.css';

const Auth = () => {
  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <div className='auth'>
      <div className='left'>
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
          <AuthSlider />
        </div>
      </div>
      <div className='right'>
        {pathname === '/login' ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Auth;
