// const { Sequelize } = require('sequelize');
import { Sequelize } from "sequelize";
export const sequelize = new Sequelize('Cloud', 'root', 'gokuhinata1111', {
    host: 'localhost',
    dialect: 'mysql'
});

const testConnection = async () => {
    console.log("Inside testConnection");
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};