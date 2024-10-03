import healthzRouter from "./healthz-route.js";
import userRouter from "./user-route.js"

export default (app) => {
    app.use('/healthz', healthzRouter);
    
    // Defined a common route for all User APIs. Differentiation would be on the basis of method types - GET, POST, PUT, etc
    app.use('/v1/user', userRouter);
}