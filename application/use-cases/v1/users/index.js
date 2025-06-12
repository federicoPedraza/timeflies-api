const signUpUseCase = require('./sign-up.use-case');
const logInUseCase = require('./log-in.use-case');
const getEmailUsageUseCase = require('./get-email-usage.use-case');
const deleteUserUseCase = require('./delete-user.use-case');
const refreshTokenUseCase = require('./refresh-token.use-case');
const changePasswordUseCase = require('./change-password.use-case');
const getUserSettingsUseCase = require('./get-user-settings.use-case');
const updateSettingsUseCase = require('./update-settings.use-case');

module.exports = {
    signUpUseCase: new signUpUseCase(),
    logInUseCase: new logInUseCase(),
    getEmailUsageUseCase: new getEmailUsageUseCase(),
    deleteUserUseCase: new deleteUserUseCase(),
    refreshTokenUseCase: new refreshTokenUseCase(),
    changePasswordUseCase: new changePasswordUseCase(),
    getUserSettingsUseCase: new getUserSettingsUseCase(),
    updateSettingsUseCase: new updateSettingsUseCase()
}
