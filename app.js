const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

healthRoute = require('./routes/healthz')
app.use('/', healthRoute);

module.exports = app;