import router from "./healthz-route.js";

export default (app) => {
    app.use('/', router);
}