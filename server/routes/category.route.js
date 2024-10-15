import express from 'express';
import * as categoryController from '../controllers/category.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// POST Endpoints
router.post('/', verifyToken, categoryController.createCategory);

// GET Endpoints
router.get('/', verifyToken, categoryController.getCategories);
router.get('/:id', verifyToken, categoryController.getCategory);

// PUT Endpoints
router.put('/:id', verifyToken, categoryController.updateCategory);

// DELETE Endpoints
router.delete('/:id', verifyToken, categoryController.deleteCategory);

export default router;
