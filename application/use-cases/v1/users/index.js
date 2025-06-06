const signUpUseCase = require('./sign-up.use-case');
const logInUseCase = require('./log-in.use-case');

module.exports = {
    signUpUseCase: new signUpUseCase(),
    logInUseCase: new logInUseCase()
}
