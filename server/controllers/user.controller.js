import { User } from '../models/User.model.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({
      isAdmin: false,
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const otherUsers = await User.find({
      _id: {
        $ne: req.userId,
      },
      isAdmin: false,
    });

    res.status(200).json({
      success: true,
      users: otherUsers,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
