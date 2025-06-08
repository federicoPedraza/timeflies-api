const { timeEventRepository } = require('../../../../infrastructure/repositories/postgresql');
const { InvalidModifyEventParametersException, ForbiddenException, EventNotFoundException } = require('../../../exceptions/v1');

class ModifyEventUseCase {
    async execute(user, payload, targetEventId) {
        const event = await timeEventRepository.findById(targetEventId);

        if (!event) {
            throw new EventNotFoundException();
        }

        if (user.id !== event.author_id) {
            throw new ForbiddenException();
        }
        console.log(payload);


        if (!payload.title || !payload.start || !payload.end) {
            throw new InvalidModifyEventParametersException();
        }


        const updatedEvent = await timeEventRepository.update(targetEventId, {
            title: payload.title,
            description: payload.description || '',
            start: payload.start,
            end: payload.end
        });

        return updatedEvent;
    }
}

module.exports = ModifyEventUseCase;
