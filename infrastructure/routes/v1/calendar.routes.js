const express = require('express');
const router = express.Router();
const useCases = require('../../../application/use-cases/v1');
const { Response } = require('../../../application/presentations');

router.get('/events', async (req, res) => {
    const { start, end } = req.query;

    const result = await useCases.getEventsUseCase.execute(req.user, start, end);
    Response.send({
        res,
        data: result,
        message: 'Events retrieved successfully'
    });
});

router.post('/create', async (req, res) => {
    const result = await useCases.createEventUseCase.execute(req.user, req.body);
    Response.send({
        res,
        data: result,
        message: 'Event created successfully'
    });
});

router.put('/modify/:targetEventId', async (req, res) => {
    await useCases.modifyEventUseCase.execute(req.user, req.body, req.params.targetEventId);
    Response.send({
        res,
        message: 'Event modified successfully'
    });
});

router.delete('/delete/:targetEventId', async (req, res) => {
    await useCases.deleteEventUseCase.execute(req.user, req.params.targetEventId);
    Response.send({
        res,
        message: 'Event deleted successfully'
    });
});

module.exports = {
    path: '/calendar',
    router
};
