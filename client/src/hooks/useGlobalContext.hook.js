import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('Theere is a problem with loading ContextProvider');
  }
  const { dashboardView, setDashboardView } = context;
  return {
    dashboardView,
    setDashboardView,
  };
};
