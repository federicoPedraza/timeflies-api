const { v4: uuidv4 } = require('uuid');
const { knex } = require('../../config').knex;

class RefreshTokenRepository {
    async create({ userId, token, expiresAt }) {
        const id = uuidv4();
        const now = new Date();

        await knex('refresh_tokens').insert({
            id,
            user_id: userId,
            token,
            expires_at: expiresAt,
            created_at: now,
            updated_at: now
        });

        return { id, userId, token, expiresAt };
    }

    async findByToken(token) {
        const row = await knex('refresh_tokens')
            .where('token', token)
            .first();

        if (!row) return null;

        return {
            id: row.id,
            userId: row.user_id,
            token: row.token,
            expiresAt: row.expires_at
        };
    }

    async deleteByUserId(userId) {
        await knex('refresh_tokens')
            .where('user_id', userId)
            .delete();
    }

    async deleteByToken(token) {
        await knex('refresh_tokens')
            .where('token', token)
            .delete();
    }

    async deleteAllByUserId(userId) {
        await knex('refresh_tokens')
            .where('user_id', userId)
            .delete();
    }
}

module.exports = RefreshTokenRepository;
