const express = require('express');
const router = express.Router();
const useCases = require('../../../application/use-cases/v1');
const { Response } = require('../../../application/presentations');

router.post('/sign-up', async (req, res) => {
    const { name, email, password } = req.body;

    const result = await useCases.signUpUseCase.execute({ name, email, password });

    Response.send({
        res,
        data: result,
        message: 'User created successfully'
    });
});

router.post('/login', async (req, res) => {
    const { identifier, password } = req.body;

    const result = await useCases.logInUseCase.execute({ identifier, password });

    Response.send({
        res,
        data: result,
        message: 'User logged in successfully'
    });
});

router.get('/check-email', async (req, res) => {
    const { email } = req.query;

    const used = await useCases.getEmailUsageUseCase.execute({ email });

    const message = used ? 'Email already in use' : 'Email is available';
    Response.send({
        res,
        data: {
            available: !used
        },
        message
    });
});

router.delete('/me', async (req, res) => {
    const result = await useCases.deleteUserUseCase.execute(req.user);

    Response.send({
        res,
        data: result,
        message: 'User deleted successfully'
    });
});

module.exports = {
    path: '/users',
    router
};
