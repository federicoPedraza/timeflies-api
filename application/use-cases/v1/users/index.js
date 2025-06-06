const signInUseCase = require('./sign-in.use-case');
const logInUseCase = require('./log-in.use-case');

module.exports = {
    signInUseCase: new signInUseCase(),
    logInUseCase: new logInUseCase()
}
