const { timeEventRepository } = require('../../../../infrastructure/repositories/postgresql');

class GetEventsUseCase {
    async execute(user, start, end) {
        if (!start) {
            // set start as first day of the month
            start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        }

        if (!end) {
            // set end as last day of the month
            end = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
        }


        const events = await timeEventRepository.findAll(user.userId, start, end);

        if (!events) {
            return [];
        }

        return events;
    }
}

module.exports = GetEventsUseCase;
