import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader, Captions, MapPin, RotateCcw } from 'lucide-react';
import { DateRange } from 'react-date-range';
import toast from 'react-hot-toast';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { app } from '../utils/firebase';
import { useTripStore } from '../store/tripsStore';
import { useAuthStore } from '../store/authStore';
import Input from '../components/auth/Input';
import { useUserStore } from '../store/usersStore';

const CreateTrip = () => {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [participants, setParticipants] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  const { user } = useAuthStore();
  const { getOtherUsers } = useUserStore();
  const { createTrip, error, isLoading } = useTripStore();
  const navigate = useNavigate();

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    try {
      if (title.trim() === '') {
        toast.error('Title is required!');
        return;
      }
      if (destination.trim() === '') {
        toast.error('Destination is required!');
        return;
      }
      if (dates[0].startDate === dates[0].endDate) {
        toast.error('Select a valid date range!');
        return;
      }
      if (participants.length === 0) {
        toast.error('Add at least one friend!');
        return;
      }

      participants.push(user);

      const participantsIds = participants.map((p) => {
        return p._id;
      });

      await createTrip({
        title,
        destination,
        startDate: new Date(dates[0].startDate),
        endDate: new Date(dates[0].endDate),
        participants: participantsIds,
        image: fileUrl,
      });

      toast.success('Trip created successfully');
      navigate('/dashboard');
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

  const fetchUsers = async () => {
    const response = await getOtherUsers();
    setParticipants(response?.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
    >
      <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
        Add new Trip
      </h2>

      <div className='space-y-6'>
        <motion.div
          className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleCreateTrip}>
            <div className='w-full cursor-pointer flex justify-center items-center py-4'>
              <label htmlFor='profile'>
                <img
                  src={
                    fileUrl ||
                    'https://firebasestorage.googleapis.com/v0/b/splitwise-iteh.appspot.com/o/trip.jpg?alt=media&token=a13e3b5c-431c-41ff-91e7-f8554b86c508'
                  }
                  alt='user'
                  className='border-4 border-gray-100 w-full rounded-md shadow-lg cursor-pointer hover:border-green-400'
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
              icon={Captions}
              type='text'
              placeholder='Trip Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              icon={MapPin}
              type='text'
              placeholder='Trip Destination'
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />

            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className='date'
              minDate={new Date()}
            />

            <div className='flex flex-wrap justify-center gap-5 mt-4'>
              {participants && participants.length > 0 ? (
                participants.map((participant) => (
                  <div
                    className='flex gap-2 items-center cursor-pointer'
                    onClick={() => {
                      let newParticipants = participants.filter(
                        (p) => p._id !== participant._id
                      );
                      setParticipants(newParticipants);
                    }}
                  >
                    <img
                      src={participant.profilePicture}
                      alt={participant.name}
                      className='w-6 rounded-full'
                    />
                    <p className='text-sm text-gray-200'>{participant.name}</p>
                  </div>
                ))
              ) : (
                <div>
                  <RotateCcw
                    className='cursor-pointer'
                    color='#fff'
                    onClick={fetchUsers}
                  />
                </div>
              )}
            </div>

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
                  'Submit'
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
      <div className='flex w-full justify-center text-gray-200 mt-8'>
        <Link to='/dashboard'>Back to Dashboard</Link>
      </div>
    </motion.div>
  );
};

export default CreateTrip;
