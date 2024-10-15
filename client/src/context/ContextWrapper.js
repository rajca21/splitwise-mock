import React, { useState } from 'react';

import GlobalContext from './GlobalContext';

const ContextWrapper = (props) => {
  const [dashboardView, setDashboardView] = useState('trips');

  return (
    <GlobalContext.Provider
      value={{
        dashboardView,
        setDashboardView,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
