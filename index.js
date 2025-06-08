const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const router = require('./infrastructure/routes/routing');
const { httpErrorHandler, authHandler } = require('./infrastructure/config/middleware');

app.use(express.json());
app.use(authHandler);

app.use('/', router);

// error filter
app.use(httpErrorHandler);


module.exports = app;
