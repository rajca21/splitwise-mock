import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// GET Endpoints
router.get('/', verifyToken, userController.getUsers);
router.get('/other-users', verifyToken, userController.getOtherUsers);

export default router;
