import express from 'express';
import * as transactionController from '../controllers/transaction.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// POST Endpoints
router.post('/', verifyToken, transactionController.createTransaction);

// GET Endpoints
router.get('/', verifyToken, transactionController.getMyTransactions);
router.get('/all', verifyToken, transactionController.getAllTransactions);
router.get(
  '/:tripId/:userId',
  verifyToken,
  transactionController.getUserSpendingOnTrip
);

export default router;
