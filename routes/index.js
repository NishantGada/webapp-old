import healthzRouter from "./healthz-route.js";
import userRouter from "./user-route.js"

export default (app) => {
    app.use('/healthz', healthzRouter);
    
    app.use('/users', userRouter);
    app.use('/create-new-user', userRouter);
}