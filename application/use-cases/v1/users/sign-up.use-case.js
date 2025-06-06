const { userRepository } = require('../../../../infrastructure/repositories/postgresql');
const bcrypt = require('bcrypt');
const { UserAlreadyExistsException } = require('../../../exceptions/v1');

class SignUpUseCase {
    async execute({ name, email, password: unhashedPassword }) {
        const conflict = await userRepository.findByEmail(email);

        if (Boolean(conflict)) {
            throw new UserAlreadyExistsException();
        }

        const password = await bcrypt.hash(unhashedPassword, 10);

        const user = await userRepository.create({ name, email, password });

        return {
            id: user.id,
            message: 'User created successfully'
        };
    }
}

module.exports = SignUpUseCase;
