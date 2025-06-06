const express = require('express');
const router = express.Router();
const healthUseCases = require('../../../application/use-cases/v1/health');

router.get('/', async (req, res) => {
    const result = await healthUseCases.healthCheckUseCase.execute();
    res.status(200).json(result);
});

module.exports = {
    path: '/health',
    router
};
