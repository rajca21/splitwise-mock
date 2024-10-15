import React from 'react';
import { useNavigate } from 'react-router-dom';

import TripImg from '../../../assets/trip.jpg';
import { formatDateNoTime } from '../../../utils/date';
import { useAuthStore } from '../../../store/authStore';
import MotionButton from '../../shared/MotionButton';

const TripCard = ({ trip }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className='bg-white rounded-md w-96'>
      <img
        src={trip.image || TripImg}
        alt={'trip'}
        className='rounded-md rounded-b-none w-96 h-60'
      />
      <div className='my-2 p-4'>
        <h2 className='font-semibold'>{trip.title}</h2>
        <p className='text-sm mt-1'>{trip.destination}</p>
        <p className='text-xs mt-1'>
          Start Date: {formatDateNoTime(trip.startDate)}
        </p>
        <p className='text-xs mt-1'>
          End Date: {formatDateNoTime(trip.endDate)}
        </p>
        <div className='flex flex-row gap-2 text-xs mt-2 text-neutral-500'>
          <p>
            <span>Total Cost: </span>
            <span className='font-bold'>$ {trip.totalAmount}</span>
          </p>
          {!user.isAdmin && (
            <p>
              <span>My Cost: </span>
              <span className='font-bold'>$ {trip.userAmount}</span>
            </p>
          )}
        </div>

        {!user.isAdmin && (
          <div className='border-t mt-2 pt-6 flex justify-end'>
            <MotionButton
              text={'Add new Transaction'}
              onClick={() => {
                navigate(`/create-transaction/${trip._id}`);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TripCard;
