import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader, Mail, User } from 'lucide-react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { useAuthStore } from '../store/authStore';
import { formatDate } from '../utils/date';
import { app } from '../utils/firebase';
import Input from '../components/auth/Input';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout, updateUser, error, isLoading } = useAuthStore();
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  const handleLogout = () => {
    logout();
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        name,
        profilePicture: fileUrl || user?.profilePicture || '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const uploadImage = async () => {
      try {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            setFileError(
              'Could not upload image (File must be an image of the size less than 2MB)'
            );
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setFileUrl(downloadURL);
            });
          }
        );
      } catch (error) {
        setFileError('Something went wrong while uploading the image!');
        console.error(error);
      }
    };

    if (file) {
      uploadImage();
    }
  }, [file]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
    >
      <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
        User Profile
      </h2>

      <div className='space-y-6'>
        <motion.div
          className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className='text-xl font-semibold text-green-400 mb-3'>
            Profile Information
          </h3>

          <form onSubmit={handleUpdateProfile}>
            <div className='w-full cursor-pointer flex justify-center items-center py-4'>
              <label htmlFor='profile'>
                <img
                  src={fileUrl || user?.profilePicture}
                  alt='user'
                  className='border-4 border-gray-100 w-[100px] h-[100px] rounded-full shadow-lg cursor-pointer hover:border-green-400'
                />
              </label>
              <input
                type='file'
                id='profile'
                name='profile'
                accept='image/*'
                onChange={(e) => setFile(e.target.files[0])}
              />
              {fileError && <span className='text-red-500'>{fileError}</span>}
            </div>

            <Input
              icon={User}
              type='text'
              placeholder='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              icon={Mail}
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={true}
            />

            {error && (
              <p className='text-red-500 font-semibold mb-2'>{error}</p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className='mt-4'
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className='w-6 h-6 animate-spin  mx-auto' />
                ) : (
                  'Update Information'
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
        <motion.div
          className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className='text-xl font-semibold text-green-400 mb-3'>
            Account Activity
          </h3>
          <p className='text-gray-300'>
            <span className='font-bold text-green-400'>Joined: </span>
            {new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className='text-gray-300'>
            <span className='font-bold text-green-400'>Last Login: </span>

            {formatDate(user.lastLogin)}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className='mt-4'
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
        >
          Logout
        </motion.button>
      </motion.div>
      <div className='flex w-full justify-center text-gray-200 mt-8'>
        <Link to='/dashboard'>Back to Dashboard</Link>
      </div>
    </motion.div>
  );
};

export default Profile;
