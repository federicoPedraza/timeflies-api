const { UserNotFoundException, UserNotAuthorizedException } = require('../../../exceptions/v1/user.exceptions');
const { userRepository, timeEventRepository } = require('../../../../infrastructure/repositories/postgresql');
const bcrypt = require('bcrypt');

class DeleteUserUseCase {
    async execute(user, password) {
        const foundUser = await userRepository.findById(user.id);

        if (!foundUser) {
            throw new UserNotFoundException();
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordValid) {
            throw new UserNotAuthorizedException();
        }

        if (foundUser.id !== user.id) {
            throw new UserNotAuthorizedException();
        }

        await userRepository.delete(foundUser.id);
        await timeEventRepository.deleteByAuthorId(foundUser.id);

        return {
            message: 'User deleted successfully'
        };
    }
}

module.exports = DeleteUserUseCase;
