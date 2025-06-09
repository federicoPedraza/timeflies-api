const getEvents = require('./get-events.use-case');
const createEvent = require('./create-event.use-case');
const modifyEvent = require('./modify-event.use-case');
const deleteEvent = require('./delete-event.use-case');

module.exports = {
    getEventsUseCase: new getEvents(),
    createEventUseCase: new createEvent(),
    modifyEventUseCase: new modifyEvent(),
    deleteEventUseCase: new deleteEvent()
}
