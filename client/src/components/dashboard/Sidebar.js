import React from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logofull.png';
import { sidebar_links, sidebar_bottom_links } from '../../utils/constants';
import { useGlobalContext } from '../../hooks/useGlobalContext.hook';
import { useAuthStore } from '../../store/authStore';

const Sidebar = () => {
  const { dashboardView, setDashboardView } = useGlobalContext();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const onLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className='w-60 p-3 flex flex-col bg-neutral-300 h-screen'>
      <div className='flex items-center gap-2 px-1 py-3'>
        <img src={logo} alt='logo' className='w-10' />
        <span className='font-bold text-2xl'>Splitwise</span>
      </div>
      <div className='flex-1 mt-3'>
        {sidebar_links.map((item) => (
          <>
            {item.privilege === 'admin' ? (
              user.isAdmin && (
                <div
                  key={item.key}
                  onClick={() => setDashboardView(item.key)}
                  className={`flex gap-2 items-center font-semibold px-3 py-2 cursor-pointer rounded-sm ${
                    dashboardView === item.key && 'bg-emerald-700 text-white'
                  } hover:bg-emerald-600 hover:text-white`}
                >
                  <span className='text-xl'>{item.icon}</span>
                  {item.label}
                </div>
              )
            ) : (
              <div
                key={item.key}
                onClick={() => setDashboardView(item.key)}
                className={`flex gap-2 items-center font-semibold px-3 py-2 cursor-pointer rounded-sm ${
                  dashboardView === item.key && 'bg-emerald-700 text-white'
                } hover:bg-emerald-600 hover:text-white`}
              >
                <span className='text-xl'>{item.icon}</span>
                {item.label}
              </div>
            )}
          </>
        ))}
      </div>
      <div>
        {sidebar_bottom_links.map((item) => (
          <div
            key={item.key}
            className={`flex gap-2 items-center font-semibold px-3 py-2 cursor-pointer rounded-sm `}
            onClick={() => {
              if (item.key === 'logout') {
                onLogout();
              } else if (item.key === 'settings') {
                navigate('/profile');
              } else if (item.key === 'aboutus') {
                navigate('/about');
              }
            }}
          >
            <span className='text-xl'>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
