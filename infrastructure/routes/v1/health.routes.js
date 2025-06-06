const express = require('express');
const router = express.Router();
const useCases = require('../../../application/use-cases/v1');

router.get('/', async (req, res) => {
    const result = await useCases.healthCheckUseCase.execute();
    res.status(200).json(result);
});

module.exports = {
    path: '/health',
    router
};
