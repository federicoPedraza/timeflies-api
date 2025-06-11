const { v4: uuidv4 } = require('uuid');
const { User } = require('../../../domain/models');
const { knex } = require('../../config').knex;

class UserRepository {
	async create({ name, email, password }) {
		const id = uuidv4();
		const now = new Date();

		await knex('users').insert({
			id,
			name,
			email,
			password,
			created_at: now,
			updated_at: now
		});

		return new User({ id, name, email, password, createdAt: now, updatedAt: now });
	}

	async findById(id) {
		const row = await knex('users').where('id', id).first();
		return row ? new User({
			id: row.id,
			name: row.name,
			email: row.email,
			password: row.password,
			createdAt: row.created_at,
			updatedAt: row.updated_at
		}) : null;
	}

	async findByEmail(email) {
		const row = await knex('users').where('email', email).first();
		return row ? new User({
			id: row.id,
			name: row.name,
			email: row.email,
			password: row.password,
			createdAt: row.created_at,
			updatedAt: row.updated_at
		}) : null;
	}

	async findByName(name) {
		const row = await knex('users').where('name', name).first();
		return row ? new User({
			id: row.id,
			name: row.name,
			email: row.email,
			password: row.password,
			createdAt: row.created_at,
			updatedAt: row.updated_at
		}) : null;
	}

	async delete(id) {
		await knex('users').where('id', id).delete();
	}

	async updatePassword(id, password) {
		await knex('users').where('id', id).update({ password });
	}
}

module.exports = UserRepository;
