import React from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/favicon.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='flex justify-center items-center h-screen flex-col'>
        <img
          src={logo}
          className='w-1/2 cursor-pointer'
          onClick={() => navigate('/login')}
          alt='spliwise-logo'
        />
      </div>
    </div>
  );
};

export default Home;
