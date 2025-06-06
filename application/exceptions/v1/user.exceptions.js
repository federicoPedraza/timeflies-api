const { HTTPError } = require("../../presentations");

class UserAlreadyExistsException extends HTTPError {
    constructor() {
        super('User already exists', 409);
    }
}

class UserNotFoundException extends HTTPError {
    constructor() {
        super('User not found', 404);
    }
}

class InvalidCredentialsException extends HTTPError {
    constructor() {
        super('Invalid credentials', 401);
    }
}

module.exports = {
    UserAlreadyExistsException,
    UserNotFoundException,
    InvalidCredentialsException
}
