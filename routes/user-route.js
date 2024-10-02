import express from 'express';
import * as userController from '../controllers/user-controller.js';

const router = express.Router();

// Controller mappings for respective APIs
router.route("/self")
    .get(userController.getUserDetails)
    .put(userController.updateUserDetails)
    .head(userController.handleHeadMethod)

router.route("/")
    .post(userController.createNewUser)

// Login to block all other methods that haven't been handled, except "HEAD"
router.all("/", (req, res) => {
    res.status(405).json();
});

export default router;