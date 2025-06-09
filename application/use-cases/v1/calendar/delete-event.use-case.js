const { timeEventRepository } = require('../../../../infrastructure/repositories/postgresql');
const { ForbiddenException, EventNotFoundException } = require('../../../exceptions/v1');

class DeleteEventUseCase {
    async execute(user, targetEventId) {
        const event = await timeEventRepository.findById(targetEventId);

        if (!event) {
            throw new EventNotFoundException();
        }

        if (user.id !== event.author_id) {
            throw new ForbiddenException();
        }

        await timeEventRepository.delete(targetEventId);

        return {
            message: 'Event deleted successfully'
        };
    }
}

module.exports = DeleteEventUseCase;
