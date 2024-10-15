import mongoose from 'mongoose';

import { Transaction } from '../models/Transaction.model.js';
import { Trip } from '../models/Trip.model.js';

export const createTransaction = async (req, res) => {
  const { description, amount, trip, category } = req.body;

  try {
    if (!description || !amount || !trip || !category) {
      throw new Error('All fields are required');
    }

    const newTransaction = new Transaction({
      description,
      amount,
      trip,
      category,
      user: req.userId,
    });
    await newTransaction.save();

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      transaction: newTransaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId })
      .populate('user')
      .populate('trip')
      .populate('category')
      .exec();

    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      .populate('user')
      .populate('trip')
      .populate('category')
      .exec();

    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserSpendingOnTrip = async (req, res) => {
  try {
    const { tripId, userId } = req.params;

    const spendingSummary = await Transaction.aggregate([
      {
        $match: {
          trip: new mongoose.Types.ObjectId(tripId),
          user: new mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    let total = 0;

    if (spendingSummary.length === 0) {
      const trip = await Trip.find({
        _id: new mongoose.Types.ObjectId(tripId),
      });
      if (!trip[0].participants.includes(userId)) {
        total = -1;
      }
    } else {
      spendingSummary.forEach((el) => {
        total += el.amount;
      });
    }

    res.status(200).json({
      success: true,
      user: userId,
      trip: tripId,
      total,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
