const { v4: uuidv4 } = require('uuid');
const { UserSetting } = require('../../../domain/models');
const { knex } = require('../../config').knex;

class UserSettingRepository {
	async create({ userId, timezone, weekStartsOnSunday, focusHourOnStart, timeNotation }) {
		const id = uuidv4();
		const now = new Date();

		await knex('user_settings').insert({
			id,
			user_id: userId,
			timezone,
			week_starts_on_sunday: weekStartsOnSunday,
			focus_hour_on_start: focusHourOnStart,
			time_notation: timeNotation,
			created_at: now,
			updated_at: now
		});

		return new UserSetting({ id, userId, timezone, weekStartsOnSunday, focusHourOnStart, timeNotation, createdAt: now, updatedAt: now });
	}

	async findByUserId(userId) {
		const row = await knex('user_settings').where('user_id', userId).first();
		return row ? new UserSetting({
			id: row.id,
			userId: row.user_id,
			timezone: row.timezone,
			weekStartsOnSunday: row.week_starts_on_sunday,
			focusHourOnStart: row.focus_hour_on_start,
			timeNotation: row.time_notation,
		}) : null;
	}

	async update(userId, settings) {
		await knex('user_settings').where('user_id', userId).update(settings);
	}

	async delete(id) {
		await knex('user_settings').where('id', id).delete();
	}
}

module.exports = UserSettingRepository;
