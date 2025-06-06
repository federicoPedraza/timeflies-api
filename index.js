const express = require('express');
require('dotenv').config();

const app = express();

const router = require('./infrastructure/routes/routing');
const { httpErrorHandler } = require('./infrastructure/config/middleware');

app.use(express.json());

app.use('/', router);

// error filter
app.use(httpErrorHandler);

module.exports = app;
