import express from 'express';
import { createServer } from 'http';
import initialize from './app.js';
import { sequelize } from './config/dbconfig.js';

const app = express();
const port = 3000;
const server = createServer(app);
// server.listen(port);

initialize(app);
app.listen(port, () => {
	console.log(`Server is listening at http://localhost:${port}`);
});

console.log("server.js before db authentication");
sequelize.authenticate();