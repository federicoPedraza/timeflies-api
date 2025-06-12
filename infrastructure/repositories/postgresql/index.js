const UserRepository = require('./user.repository');
const TimeEventRepository = require('./time-event.repository');
const RefreshTokenRepository = require('./refresh-token.repository');
const UserSettingRepository = require('./user-setting.repository');

module.exports = {
    userRepository: new UserRepository(),
    timeEventRepository: new TimeEventRepository(),
    refreshTokenRepository: new RefreshTokenRepository(),
    userSettingRepository: new UserSettingRepository()
}
