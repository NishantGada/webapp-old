import { sequelize } from "../config/dbconfig.js";

export const get = async (req, res) => {
    console.log("Inside healthz-controller get");

    // Check if there are any query parameters in the request
    if (Object.keys(req.query).length !== 0) {
        return res.status(400).json();
    }

    // adding response header to prevent caching
    res.set('Cache-Control', 'no-cache');

    if (req.headers['content-length'] !== undefined) {
        return res.status(400).json()
    }

    try {
        console.log("healthz-get try block");
        await sequelize.query('SELECT 1+1 as Result');
        return res.status(200).json()
    } catch (err) {
        console.log("healthz-get catch block: ", err);
        return res.status(503).json()
    }
}