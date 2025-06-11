const { userRepository, refreshTokenRepository } = require('../../../../infrastructure/repositories/postgresql');
const { InvalidCredentialsException } = require('../../../exceptions/v1');
const { LoggedUser } = require('../../../../domain/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class LogInUseCase {
    async execute({ identifier, password }) {
        const isEmail = identifier.includes('@');

        let user = null;

        if (isEmail) {
            user = await userRepository.findByEmail(identifier);
        } else {
            user = await userRepository.findByName(identifier);
        }

        if (!user) {
            throw new InvalidCredentialsException();
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new InvalidCredentialsException();
        }

        const loggedUser = new LoggedUser({
            id: user.id,
            name: user.name,
            email: user.email
        });

        const accessToken = jwt.sign(loggedUser.toJwtPayload(), process.env.JWT_SECRET, { expiresIn: '1h' });

        const refreshToken = crypto.randomBytes(40).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

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

module.exports = LogInUseCase;
