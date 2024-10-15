import React from 'react';

const TransactionCard = ({ transaction }) => {
  return (
    <div className='bg-white rounded-md w-80 '>
      <div className='flex flex-col items-center my-2'>
        <h2 className='font-bold text-xl'>{transaction?.trip?.title}</h2>
        <h2 className='font-semibold text-lg'>
          {transaction?.trip?.destination}
        </h2>
      </div>
      <div className='bg-neutral-50 p-2'>
        <p>
          <span className='font-bold'>Description:</span>{' '}
          {transaction.description}
        </p>
        <p>
          <span className='font-bold'>Amount:</span> ${transaction.amount}
        </p>
      </div>
    </div>
  );
};

export default TransactionCard;
