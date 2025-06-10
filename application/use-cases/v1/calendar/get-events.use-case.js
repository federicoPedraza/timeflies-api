const { timeEventRepository } = require('../../../../infrastructure/repositories/postgresql');
const { GetEventsRangeTooLongException, GetEventsRangeInvalidException } = require('../../../exceptions/v1/calendar.exceptions');
const { dateTools } = require('../../../tools');

/**
 * Get events use case
 * @param {Object} user - The user object
 * @param {string} start - The start date
 * @param {string} end - The end date
 * @returns {Promise<Array>} - The events
 */
class GetEventsUseCase {
    async execute(user, start, end) {
        const today = new Date()

        // prevent invalid dates
        if (start && typeof start === 'string') start = new Date(start)
        if (!start || !dateTools.isValidDate(start)) {
            start = new Date(today.getFullYear(), today.getMonth(), 1)
        }

        if (end && typeof end === 'string') end = new Date(end)
        if (!end || !dateTools.isValidDate(end)) {
            end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        }

        // prevent invalid range
        if (start >= end) throw new GetEventsRangeInvalidException()

        // prevent range too long
        const MAX_DAYS = 90
        const diffDays = (end - start) / (1000 * 60 * 60 * 24)
        if (diffDays > MAX_DAYS) {
            throw new GetEventsRangeTooLongException()
        }

        // get events
        const events = await timeEventRepository.findAll(user.id, start, end)
        return events ?? []
    }
}

module.exports = GetEventsUseCase;
