const { timeEventRepository } = require('../../../../infrastructure/repositories/postgresql');
const { InvalidModifyEventParametersException } = require('../../../exceptions/v1/calendar.exceptions');

class ModifyEventUseCase {
    async execute(user, event, targetEventId) {
        if (!event.title || !event.start || !event.end || !targetEventId) {
            throw new InvalidModifyEventParametersException();
        }

        const updatedEvent = await timeEventRepository.update(targetEventId, {
            title: event.title,
            description: event.description || '',
            start: event.start,
            end: event.end
        });

        return updatedEvent;
    }
}

module.exports = ModifyEventUseCase;
