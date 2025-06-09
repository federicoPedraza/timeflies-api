const { UserNotFoundException, UserNotAuthorizedException } = require('../../../exceptions/v1/user.exceptions');
const { userRepository, timeEventRepository } = require('../../../../infrastructure/repositories/postgresql');

class DeleteUserUseCase {
    async execute(user) {
        const foundUser = await userRepository.findById(user.id);

        if (!foundUser) {
            throw new UserNotFoundException();
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
