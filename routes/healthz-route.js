import express from 'express';
import * as healthzController from '../controllers/healthz-controller.js';

const router = express.Router();

router.get('/healthz', (req, res) => {
    healthzController.get(req, res);
});

// Middleware logic to disallow URL parameters
router.use('/healthz/:param', (req, res) => {
    res.status(400).json();
});

// Used to catch all for unsupported methods
router.all("/healthz", (req, res) => {
    res.status(405).json();
});

export default router;