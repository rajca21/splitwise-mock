import React from 'react';

const GlobalContext = React.createContext({
  dashboardView: 'trips',
  setDashboardView: () => {},
});

export default GlobalContext;
