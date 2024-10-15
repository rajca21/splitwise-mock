import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: {
      type: Array,
      default: [],
    },
    image: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/splitwise-iteh.appspot.com/o/trip.jpg?alt=media&token=a13e3b5c-431c-41ff-91e7-f8554b86c508',
    },
  },
  { timestamps: true }
);

export const Trip = mongoose.model('Trip', TripSchema);
