const { UserNotFoundException, UserNotAuthorizedException } = require('../../../exceptions/v1/user.exceptions');
const { userRepository, refreshTokenRepository } = require('../../../../infrastructure/repositories/postgresql');
const bcrypt = require('bcrypt');

class ChangePasswordUseCase {
    async execute(user, oldPassword, newPassword) {
        const foundUser = await userRepository.findById(user.id);

        if (!foundUser) {
            throw new UserNotFoundException();
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, foundUser.password);

        if (!isPasswordValid) {
            throw new UserNotAuthorizedException();
        }

        if (foundUser.id !== user.id) {
            throw new UserNotAuthorizedException();
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await userRepository.updatePassword(foundUser.id, hashedNewPassword);

        // invalidate all refresh tokens
        await refreshTokenRepository.deleteAllByUserId(foundUser.id);

        return {
            message: 'Password changed successfully'
        };
    }
}

module.exports = ChangePasswordUseCase;
