const { userRepository, refreshTokenRepository } = require('../../../../infrastructure/repositories/postgresql');
const { LoggedUser } = require('../../../../domain/models');
const { UserEmailAlreadyExistsException } = require('../../../exceptions/v1');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class SignUpUseCase {
    async execute({ name, email, password: unhashedPassword }) {
        const conflict = await userRepository.findByEmail(email);

        if (Boolean(conflict)) {
            throw new UserEmailAlreadyExistsException();
        }

        const password = await bcrypt.hash(unhashedPassword, 10);

        const user = await userRepository.create({ name, email, password });

        const loggedUser = new LoggedUser({
            id: user.id,
            name: user.name,
            email: user.email
        });

        // Generate access token
        const accessToken = jwt.sign(loggedUser.toJwtPayload(), process.env.JWT_SECRET, { expiresIn: '1h' });

        // Generate refresh token
        const refreshToken = crypto.randomBytes(40).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

        // Create refresh token
        await refreshTokenRepository.create({
            userId: user.id,
            token: refreshToken,
            expiresAt
        });

        return {
            id: user.id,
            accessToken,
            refreshToken
        };
    }
}

module.exports = SignUpUseCase;
