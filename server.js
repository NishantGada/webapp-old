import express from 'express';
import initialize from './app.js';
import { sequelize } from './config/dbconfig.js';
import { checkPassword, encryptPassword } from './utils/hash.js';
import User from './models/user-model.js';

const app = express();
const port = process.env.PORT;

initialize(app);
app.listen(port);

try {
    // logic to test DB connection on start
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

/*
const newHash = await encryptPassword("some-random-password");
console.log("newHash: ", newHash);

const passwordMatch = await checkPassword("some-random-password", newHash);
console.log("passwordMatch: ", passwordMatch);
*/

sequelize.sync()
    .then(() => {
        console.log('User table has been successfully created, if one doesn\'t exist');
    })
    .catch(error => console.log('This error occurred:', error));