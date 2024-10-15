import express from 'express';
import * as tripController from '../controllers/trip.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// POST Endpoints
router.post('/', verifyToken, tripController.createTrip);

// GET Endpoints
router.get('/', verifyToken, tripController.getTrips);
router.get('/all', verifyToken, tripController.getAllTrips);
router.get('/:id', verifyToken, tripController.getTrip);

// PUT Endpoints
router.put('/:id', verifyToken, tripController.updateTrip);

// DELETE Endpoints
router.delete('/:id', verifyToken, tripController.deleteTrip);

export default router;
