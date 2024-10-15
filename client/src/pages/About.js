import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import aboutImg from '../assets/about.svg';

const About = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className=' w-[1/2] my-5 mx-auto px-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
    >
      <div className='flex justify-center items-center py-20'>
        <div className='title flex flex-col items-center'>
          <h4 className='text-5xl font-bold text-gray-200'>
            What is Splitwise?
          </h4>
          <p className='mt-4 text-gray-200'>
            Splitwise is a Providence, RI-based company that makes it easy to
            split bills with friends and family.
          </p>
          <p className='text-gray-200'>
            We organize all your shared expenses and IOUs in one place, so that
            everyone can see who they owe.
          </p>
          <p className='text-gray-200'>
            Whether you are sharing a ski vacation, splitting rent with
            roommates,
          </p>
          <p className='text-gray-200'>
            or paying someone back for lunch, Splitwise makes life easier.
          </p>
          <p className='text-gray-200'>
            We store your data in the cloud so that you can access it anywhere:
            on iPhone, Android, or on your computer.
          </p>
          <h2 className='mt-4 font-bold text-lg text-gray-200'>
            We focus on fairness
          </h2>
          <p className='text-gray-200'>
            Most people want to be fair to each other, but sometimes they
            forget, or can’t decide on what fair is.
          </p>
          <p className='text-gray-200'>
            In addition to helping people honor their debts,
          </p>
          <p className='text-gray-200'>
            we provide mediation advice about fairness issues through our
            “fairness calculators.”
          </p>
          <p className='text-gray-200'>
            These calculators turn our crowdsourced data into a neutral fairness
            opinion about your personal situation.
          </p>

          <img src={aboutImg} alt='logo' className='mt-10 w-52' />
          <div className='text-center mt-20'>
            <span
              onClick={() => navigate('/dashboard')}
              className='text-gray-500 cursor-pointer'
            >
              Back to Dashboard
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
