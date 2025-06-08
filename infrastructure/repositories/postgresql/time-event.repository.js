const { v4: uuidv4 } = require('uuid');
const { knex } = require('../../config').knex;
const { TimeEvent } = require('../../../domain/models');

class TimeEventRepository {
	async create({ authorId, title, description, start, end }) {
		const id = uuidv4();
		const now = new Date();

		await knex('time_events').insert({
			id,
			author_id: authorId,
			title,
			description,
			start,
			end,
			created_at: now,
			updated_at: now
		});

		return new TimeEvent({ id, authorId, title, description, start, end, createdAt: now, updatedAt: now });
	}

    async findAll(authorId, start, end) {
		const events = await knex('time_events').where('author_id', authorId).whereBetween('start', [start, end]).orderBy('start', 'asc');
        return events.map(event => new TimeEvent({
            id: event.id,
            authorId: event.author_id,
            title: event.title,
            description: event.description,
            start: event.start,
            end: event.end,
            createdAt: event.created_at,
            updatedAt: event.updated_at
        }));
    }

    async update(targetEventId, event) {
        await knex('time_events').where('id', targetEventId).update(event);
    }
}

module.exports = TimeEventRepository;
