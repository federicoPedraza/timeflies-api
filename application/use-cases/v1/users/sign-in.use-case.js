const { userRepository } = require('../../../../infrastructure/repositories/postgresql');
const bcrypt = require('bcrypt');

class SignInUseCase {
    async execute({ name, email, password: unhashedPassword }) {
        const conflict = await userRepository.findByEmail(email);

        if (Boolean(conflict)) {
            throw new Error('User already exists');
        }

        const password = await bcrypt.hash(unhashedPassword, 10);

        const user = await userRepository.create({ name, email, password });

        return {
            id: user.id,
            message: 'User created successfully'
        };
    }
}

module.exports = SignInUseCase;
