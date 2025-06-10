const { userRepository, refreshTokenRepository } = require('../../../../infrastructure/repositories/postgresql');
const { LoggedUser } = require('../../../../domain/models');
const { InvalidCredentialsException } = require('../../../exceptions/v1');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class RefreshTokenUseCase {
    async execute({ refreshToken }) {
        const storedToken = await refreshTokenRepository.findByToken(refreshToken);

        if (!storedToken) {
            throw new InvalidCredentialsException();
        }

        if (new Date() > new Date(storedToken.expiresAt)) {
            await refreshTokenRepository.deleteByToken(refreshToken);
            throw new InvalidCredentialsException();
        }

        const user = await userRepository.findById(storedToken.userId);

        if (!user) {
            await refreshTokenRepository.deleteByToken(refreshToken);
            throw new InvalidCredentialsException();
        }

        const loggedUser = new LoggedUser({
            id: user.id,
            name: user.name,
            email: user.email
        });

        const accessToken = jwt.sign(loggedUser.toJwtPayload(), process.env.JWT_SECRET, { expiresIn: '1h' });

        const newRefreshToken = crypto.randomBytes(40).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

        await refreshTokenRepository.deleteByToken(refreshToken);

        await refreshTokenRepository.create({
            userId: user.id,
            token: newRefreshToken,
            expiresAt
        });

        return {
            accessToken,
            refreshToken: newRefreshToken
        };
    }
}

module.exports = RefreshTokenUseCase;
