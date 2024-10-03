import express from 'express';
import * as userController from '../controllers/user-controller.js';

const router = express.Router();

router.use('/self', (req, res, next) => {
    // Disallow any query parameters or URL parameters
    if (Object.keys(req.query).length > 0 || Object.keys(req.params).length > 0) {
        console.log("Query / URL params NOT allowed");
        return res.status(400).json();
    }
    next();
});

router.use('/', (req, res, next) => {
    // Disallow any query parameters or URL parameters
    if (Object.keys(req.query).length > 0 || Object.keys(req.params).length > 0) {
        console.log("Query / URL params NOT allowed");
        return res.status(400).json();
    }
    next();
});


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