const { userRepository } = require('../../../../infrastructure/repositories/postgresql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        return {
            token
        };
    }
}

module.exports = LogInUseCase;
