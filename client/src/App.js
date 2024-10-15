import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { useAuthStore } from './store/authStore';
import FloatingCircle from './components/shared/FloatingCircle';
import LoadingSpinner from './components/shared/LoadingSpinner';
import RedirectAuthenticatedUser from './components/auth/RedirectAuthenticatedUser';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import About from './pages/About';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import CreateTrip from './pages/CreateTrip';
import CreateTransaction from './pages/CreateTransaction';

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className='min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'
    >
      <FloatingCircle
        color='bg-green-500'
        size='w-64 h-64'
        top='-5%'
        left='10%'
        delay={0}
      />
      <FloatingCircle
        color='bg-emerald-500'
        size='w-48 h-48'
        top='70%'
        left='80%'
        delay={5}
      />
      <FloatingCircle
        color='bg-lime-500'
        size='w-32 h-32'
        top='40%'
        left='-10%'
        delay={2}
      />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/signup'
          element={
            <RedirectAuthenticatedUser>
              <SignUp />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/login'
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/verify-email/:email'
          element={
            <RedirectAuthenticatedUser>
              <VerifyEmail />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/reset-password/:token/:email'
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/about'
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path='/create-trip'
          element={
            <ProtectedRoute>
              <CreateTrip />
            </ProtectedRoute>
          }
        />

        <Route
          path='/create-transaction/:tripId'
          element={
            <ProtectedRoute>
              <CreateTransaction />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>

      <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
}

export default App;
