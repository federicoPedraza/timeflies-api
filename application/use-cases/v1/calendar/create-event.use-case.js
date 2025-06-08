const { timeEventRepository } = require('../../../../infrastructure/repositories/postgresql');

class CreateEventUseCase {
    async execute(user, event) {
        if (!event.title || !event.start || !event.end) {
            throw new InvalidCreateEventParametersException();
        }

        const newEvent = await timeEventRepository.create({
            authorId: user.id,
            title: event.title,
            description: event.description || '',
            start: event.start,
            end: event.end
        });
        return newEvent;
    }
}

module.exports = CreateEventUseCase;
