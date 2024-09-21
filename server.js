const http = require('http')
const app = require('./app')

const port = process.env.port || 3000;
const server = http.createServer(app);
server.listen(port);

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('Cloud', 'root', 'gokuhinata1111', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate()
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// module.exports = router;