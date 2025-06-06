const healthCheck = require('./health-check.use-case');

module.exports = {
    healthCheckUseCase: new healthCheck()
}
