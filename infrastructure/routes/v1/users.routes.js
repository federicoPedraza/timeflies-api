const express = require('express');
const router = express.Router();
const useCases = require('../../../application/use-cases/v1');

router.post('/sign-in', async (req, res) => {
    const { name, email, password } = req.body;

    const result = await useCases.signInUseCase.execute({ name, email, password });

    res.status(200).json(result);
});

router.post('/login', async (req, res) => {
    const { identifier, password } = req.body;

    const result = await useCases.logInUseCase.execute({ identifier, password });

    res.status(200).json(result);
});

module.exports = {
    path: '/users',
    router
};
