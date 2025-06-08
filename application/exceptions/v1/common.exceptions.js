const { HTTPError } = require("../../presentations");

class ForbiddenException extends HTTPError {
    constructor() {
        super('Forbidden action', 403);
    }
}

module.exports = {
    ForbiddenException
}
