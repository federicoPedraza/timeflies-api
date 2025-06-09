const signUpUseCase = require('./sign-up.use-case');
const logInUseCase = require('./log-in.use-case');
const getEmailUsageUseCase = require('./get-email-usage.use-case');

module.exports = {
    signUpUseCase: new signUpUseCase(),
    logInUseCase: new logInUseCase(),
    getEmailUsageUseCase: new getEmailUsageUseCase()
}
