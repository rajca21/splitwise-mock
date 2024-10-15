import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Loader, Captions, CircleDollarSign } from 'lucide-react';

import { useCategoriesStore } from '../store/categoriesStore';
import { useTransactionsStore } from '../store/transactionsStore';
import Input from '../components/auth/Input';

const CreateTransaction = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState(null);
  const [allCategories, setAllCategories] = useState([]);

  const navigate = useNavigate();
  const { tripId } = useParams();

  const { getCategories, error, isLoading } = useCategoriesStore();
  const {
    createTransaction,
    error: transError,
    isLoading: transLoading,
  } = useTransactionsStore();

  const handleCreateTransaction = async (e) => {
    e.preventDefault();

    if (description.trim() === '') {
      toast.error('Description is required');
      return;
    }
    if (amount <= 0 || !amount) {
      toast.error('Amount is required');
      return;
    }
    if (!category) {
      toast.error('Category is required');
      return;
    }

    try {
      await createTransaction({
        trip: tripId,
        category,
        description,
        amount,
      });
      toast.success('Transaction created');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setAllCategories(response.categories);
      setCategory(response.categories[0]?._id);
    };

    fetchCategories();
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
        Add new Transaction
      </h2>

      <div className='space-y-6'>
        <motion.div
          className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleCreateTransaction}>
            <Input
              icon={Captions}
              type='text'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              icon={CircleDollarSign}
              type='number'
              min={0.1}
              step='.01'
              placeholder='Amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            {error && (
              <p className='text-red-500 font-semibold mb-2'>{error}</p>
            )}

            {allCategories && (
              <select
                className='w-full bg-gray-800 text-white rounded-lg border-gray-200'
                value={category || allCategories[0]?._id}
                onChange={(e) => setCategory(e.target.value)}
              >
                {allCategories.map((cat) => (
                  <option key={cat._id} className='text-white' value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
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
                disabled={isLoading || transLoading}
              >
                {isLoading || transLoading ? (
                  <Loader className='w-6 h-6 animate-spin  mx-auto' />
                ) : (
                  'Submit'
                )}
              </motion.button>
            </motion.div>
          </form>

          {transError && (
            <p className='text-red-500 font-semibold mb-2'>{transError}</p>
          )}
        </motion.div>
      </div>
      <div className='flex w-full justify-center text-gray-200 mt-8'>
        <Link to='/dashboard'>Back to Dashboard</Link>
      </div>
    </motion.div>
  );
};

export default CreateTransaction;
