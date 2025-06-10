const UserRepository = require('./user.repository');
const TimeEventRepository = require('./time-event.repository');
const RefreshTokenRepository = require('./refresh-token.repository');
const WeatherRepository = require('../weather.repository');

module.exports = {
    userRepository: new UserRepository(),
    timeEventRepository: new TimeEventRepository(),
    refreshTokenRepository: new RefreshTokenRepository(),
    weatherRepository: new WeatherRepository()
}
