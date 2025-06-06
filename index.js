const express = require('express');
require('dotenv').config();

const app = express();

const router = require('./infrastructure/routes/routing');

app.use(express.json());

app.use('/', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
