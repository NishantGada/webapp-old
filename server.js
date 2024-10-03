import express from 'express';
import initialize from './app.js';
import { sequelize } from './config/dbconfig.js';

const app = express();
const port = process.env.PORT;

initialize(app);
app.listen(port);

try {
    // logic to test DB connection on start
    await sequelize.authenticate();
    console.log('Connection has been established successfully…');
} catch (error) {
    console.error('Unable to connect to the database: ', error);
}

sequelize.sync()
    .then(() => {
        console.log('User table has been successfully created…');
    })
    .catch(error => console.log('error:', error));