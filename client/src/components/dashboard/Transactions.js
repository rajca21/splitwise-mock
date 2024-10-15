import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useAuthStore } from '../../store/authStore';
import { useTransactionsStore } from '../../store/transactionsStore';
import LoadingSpinner from '../shared/LoadingSpinner';
import TransactionCard from './dashboard-reusable/TransactionCard';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([]);

  const { user } = useAuthStore();
  const { getMyTransactions, getAllTransactions, isLoading, error } =
    useTransactionsStore();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user.isAdmin) {
        const response = await getAllTransactions();
        setTransactions(response.transactions);
      } else {
        const response = await getMyTransactions();
        setTransactions(response.transactions);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(transactions?.length / 8); i++) {
      pages.push(i);
    }
    setPagesArray(pages);
    setCurrentPage(1);
  }, [transactions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='flex justify-between items-center w-full mb-4 p-4'>
        <h2 className='text-3xl font-bold text-gray-200'>Transactions</h2>
        <div className='pagination'>
          {pagesArray.map((page) => (
            <p
              key={page}
              className={`pagination-box hover:bg-emerald-600 ${
                page === currentPage ? 'bg-emerald-900' : 'bg-emerald-700'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </p>
          ))}
        </div>
      </div>

      <div className='flex flex-row flex-wrap gap-4 p-4'>
        {isLoading ? (
          <div className='w-full'>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {transactions &&
              transactions
                .slice(currentPage * 8 - 8, currentPage * 8)
                .map((transaction, idx) => (
                  <TransactionCard key={idx} transaction={transaction} />
                ))}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Transactions;
