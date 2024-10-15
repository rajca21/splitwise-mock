import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useUserStore } from '../../store/usersStore';
import { useTripStore } from '../../store/tripsStore';
import LoadingSpinner from '../shared/LoadingSpinner';
import TableCell from './dashboard-reusable/TableCell';

const Overview = () => {
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const { getAllUsers, isLoading } = useUserStore();
  const { getAllTrips, isLoading: tripsLoading } = useTripStore();

  useEffect(() => {
    const getData = async () => {
      try {
        const userRes = await getAllUsers();
        setUsers(userRes.users);
        const tripRes = await getAllTrips('');
        setTrips(tripRes.trips);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='flex justify-between items-center w-full mb-4 p-4'>
        <h2 className='text-3xl font-bold text-gray-200'>Overview</h2>
      </div>

      {isLoading || tripsLoading ? (
        <LoadingSpinner />
      ) : (
        <div className='p-2'>
          <table className='min-w-full bg-white border-gray-300 rounded-lg shadow-md text-center'>
            <thead>
              <tr>
                <th></th>
                {users.map((user) => (
                  <th className='text-lg' key={user._id}>
                    {user.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip._id}>
                  <td className='text-md font-semibold text-left pl-2 text-gray-200 bg-emerald-900'>
                    {trip.title}
                  </td>
                  {users.map((user) => (
                    <TableCell
                      key={user._id}
                      userId={user._id}
                      tripId={trip._id}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default Overview;
