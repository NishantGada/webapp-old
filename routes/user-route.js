import express from 'express';
import * as userController from '../controllers/user-controller.js';

const router = express.Router();

// Route to fetch all users
router.route("/")
    .get(userController.getAllUsers)
    .post(userController.createNewUser)

export default router;