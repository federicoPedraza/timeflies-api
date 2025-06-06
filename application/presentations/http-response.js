class HTTPResponse {
    static send({ res, data, message = 'Success', statusCode = 200 }) {
        res.status(statusCode).json({
            message,
            statusCode,
            data
        });
    }
}

module.exports = HTTPResponse;
