const { userRepository } = require('../../../../infrastructure/repositories/postgresql');
const { LoggedUser } = require('../../../../domain/models');
const { UserEmailAlreadyExistsException, UserNameAlreadyExistsException } = require('../../../exceptions/v1');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class SignUpUseCase {
    async execute({ name, email, password: unhashedPassword }) {
        const conflict = await userRepository.findByEmail(email);

        if (Boolean(conflict)) {
            throw new UserEmailAlreadyExistsException();
        }

        const nameConflict = await userRepository.findByName(name);

        if (Boolean(nameConflict)) {
            throw new UserNameAlreadyExistsException();
        }

        const password = await bcrypt.hash(unhashedPassword, 10);

        const user = await userRepository.create({ name, email, password });

        const loggedUser = new LoggedUser({
            id: user.id,
            name: user.name,
            email: user.email
        });

        const token = jwt.sign(loggedUser.toJwtPayload(), process.env.JWT_SECRET, { expiresIn: '1h' });

        return {
            id: user.id,
            token
        };
    }
}

module.exports = SignUpUseCase;
