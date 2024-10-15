import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

import { useTransactionsStore } from '../../../store/transactionsStore';
import LoadingSpinner from '../../shared/LoadingSpinner';

const TableCell = ({ userId, tripId }) => {
  const [spending, setSpending] = useState(0);
  const { getUsersSpending, isLoading } = useTransactionsStore();

  useEffect(() => {
    const fetchSpending = async () => {
      try {
        const response = await getUsersSpending(tripId, userId);
        setSpending(response.total);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSpending();
  }, []);

  return (
    <td className='my-2 py-2 text-gray-200 bg-emerald-800'>
      {isLoading ? (
        <div className='w-1 h-1'>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {spending === 0 ? (
            '0'
          ) : spending === -1 ? (
            <div className='flex justify-center'>
              <X color='#ef4444' />
            </div>
          ) : (
            `$ ${spending}`
          )}
        </>
      )}
    </td>
  );
};

export default TableCell;
