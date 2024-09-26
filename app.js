import express from 'express';
import registerRouter from './routes/index.js';

const initialize = (app) => {
    app.use(express.json());
    
    // Initialize routes
    registerRouter(app);
};

export default initialize;