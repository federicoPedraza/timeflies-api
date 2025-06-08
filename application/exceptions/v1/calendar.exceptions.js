const { HTTPError } = require("../../presentations");

class InvalidCreateEventParametersException extends HTTPError {
    constructor() {
        super('Invalid create event parameters', 400);
    }
}

class InvalidModifyEventParametersException extends HTTPError {
    constructor() {
        super('Invalid modify event parameters', 400);
    }
}

module.exports = {
    InvalidCreateEventParametersException,
    InvalidModifyEventParametersException
}
