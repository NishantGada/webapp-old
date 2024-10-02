import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbconfig.js';  // Assuming dbconfig.js exports a configured Sequelize instance

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
    createdAt: 'accountCreated',
    updatedAt: 'accountUpdated'
});

export default User;