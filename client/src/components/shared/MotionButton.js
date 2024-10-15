import React from 'react';
import { motion } from 'framer-motion';

const MotionButton = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type='button'
      className='py-2 px-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
  font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
   focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default MotionButton;
