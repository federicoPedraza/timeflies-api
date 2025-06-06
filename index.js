const express = require('express');
require('dotenv').config();

const app = express();

const router = require('./infrastructure/routes/routing');
const { httpErrorHandler } = require('./infrastructure/config/middleware');

app.use(express.json());

app.use('/', router);

// error filter
app.use(httpErrorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
