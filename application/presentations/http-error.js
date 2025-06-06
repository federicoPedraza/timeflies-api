class HTTPError extends Error {
    constructor(message, statusCode = 500, data = undefined) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = HTTPError;
