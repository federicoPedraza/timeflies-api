const { HTTPError } = require("../../presentations");

class UserEmailAlreadyExistsException extends HTTPError {
    constructor() {
        super('User with that email already exists', 409);
    }
}

class UserNameAlreadyExistsException extends HTTPError {
    constructor() {
        super('User with that name already exists', 409);
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

class UserNotAuthorizedException extends HTTPError {
    constructor() {
        super('User not authorized', 401);
    }
}

module.exports = {
    UserEmailAlreadyExistsException,
    UserNameAlreadyExistsException,
    UserNotFoundException,
    InvalidCredentialsException,
    UserNotAuthorizedException
}
