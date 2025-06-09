const { userRepository } = require('../../../../infrastructure/repositories/postgresql');

class GetEmailUsageUseCase {
    async execute({ email }) {
        const user = await userRepository.findByEmail(email);
        return !!user;
    }
}

module.exports = GetEmailUsageUseCase;
