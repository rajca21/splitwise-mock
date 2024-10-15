import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader, Pencil, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

import { useCategoriesStore } from '../../store/categoriesStore';
import MotionButton from '../shared/MotionButton';
import LoadingSpinner from '../shared/LoadingSpinner';
import Input from '../auth/Input';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editedCategoryId, setEditedCategoryId] = useState(null);
  const [editedField, setEditedField] = useState('');
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const {
    getCategories,
    updateCategory,
    createCategory,
    deleteCategory,
    error,
    isLoading,
  } = useCategoriesStore();

  const handleUpdateCategory = async () => {
    try {
      if (editedField === '') {
        await deleteCategory(editedCategoryId);
        let newCategories = categories.filter((category) => {
          return category._id !== editedCategoryId;
        });
        setCategories(newCategories);
        toast.success('Category deleted');
        setEditedCategoryId(null);
        setEditedField('');
        return;
      }

      await updateCategory(editedCategoryId, {
        name: editedField,
      });

      toast.success('Category updated');

      categories.map((category) => {
        if (category._id === editedCategoryId) {
          category.name = editedField;
        }
      });

      setEditedCategoryId(null);
      setEditedField('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      const response = await createCategory({
        name: newCategory,
      });

      toast.success('Category created');

      categories.push(response.category);

      setCreatingCategory(false);
      setNewCategory('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response.categories);
    };

    fetchCategories();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='flex justify-between items-center w-full mb-4 p-4'>
        <h2 className='text-3xl font-bold text-gray-200'>Categories</h2>
        <MotionButton
          text={'Add new Category'}
          onClick={() => {
            setCreatingCategory(true);
          }}
        />
      </div>

      <div className='flex flex-wrap gap-4 p-3'>
        {isLoading ? (
          <div className='w-full'>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {categories.map((category) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={category._id}
                className='flex flex-col items-center'
              >
                <Input
                  icon={Pencil}
                  value={
                    category._id === editedCategoryId
                      ? editedField
                      : category.name
                  }
                  onChange={(e) => {
                    setEditedCategoryId(category._id);
                    setEditedField(e.target.value);
                    setCreatingCategory(false);
                  }}
                />
                {category._id === editedCategoryId && (
                  <button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type='button'
                    className='w-full -mt-4 py-2 px-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
              font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
               focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                    onClick={handleUpdateCategory}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader className='w-6 h-6 animate-spin  mx-auto' />
                    ) : editedField !== '' ? (
                      'Update'
                    ) : (
                      'Delete'
                    )}
                  </button>
                )}
              </motion.div>
            ))}
          </>
        )}

        <>
          {creatingCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='flex flex-col items-center'
            >
              <Input
                icon={Plus}
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                }}
              />
              {newCategory?.trim() !== '' && (
                <button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type='button'
                  className='w-full -mt-4 py-2 px-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
              font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
               focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                  onClick={handleCreateCategory}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className='w-6 h-6 animate-spin  mx-auto' />
                  ) : (
                    'Save'
                  )}
                </button>
              )}
            </motion.div>
          )}
        </>
      </div>
    </motion.div>
  );
};

export default Categories;
