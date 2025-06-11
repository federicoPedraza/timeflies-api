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
    const { email, password } = req.body;

    const result = await useCases.logInUseCase.execute({ email, password });

    Response.send({
        res,
        data: result,
        message: 'User logged in successfully'
    });
});

router.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;

    const result = await useCases.refreshTokenUseCase.execute({ refreshToken });

    Response.send({
        res,
        data: result,
        message: 'Token refreshed successfully'
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
    const { password } = req.body;
    const result = await useCases.deleteUserUseCase.execute(req.user, password);

    Response.send({
        res,
        data: result,
        message: 'User deleted successfully'
    });
});

router.put('/change-password', async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    await useCases.changePasswordUseCase.execute(req.user, oldPassword, newPassword);

    Response.send({
        res,
        message: 'Password changed successfully'
    });
});

module.exports = {
    path: '/users',
    router
};
