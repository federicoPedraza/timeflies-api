const { HTTPError } = require("../../../application/presentations")

module.exports = (err, req, res, next) => {
    console.log(err);
    const isHttpError = err instanceof HTTPError;

    const statusCode = isHttpError ? err.statusCode : 500;
    const message = isHttpError ? err.message : 'Internal Server Error';
    const data = isHttpError ? err.data : undefined;

    res.status(statusCode).json({
        message,
        statusCode,
        data
    });
}
