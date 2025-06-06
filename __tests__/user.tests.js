const request = require('supertest');
const app = require('../index');
const { knex } = require('../infrastructure/config').knex

beforeAll(async () => {
    await knex.migrate.latest();
});

afterAll(async () => {
    await knex.destroy();
});

describe('POST /v1/users/sign-up', () => {
    it('should fail when email is already in use', async () => {
        const res = await request(app)
            .post('/v1/users/sign-up')
            .send({ name: 'test', email: 'test@test.com', password: 'password' });

        expect(res.status).toBe(409);
        expect(res.body.message).toBe('User with that email already exists');
    });

    it('should fail when name is already in use', async () => {
        const res = await request(app)
            .post('/v1/users/sign-up')
            .send({ name: 'test', email: 'test2@test.com', password: 'password' });

        expect(res.status).toBe(409);
        expect(res.body.message).toBe('User with that name already exists');
    });
});
