const WeatherRepository = require('./weather.repository');

module.exports = {
    postgresql: require('./postgresql'),
    weatherRepository: new WeatherRepository(),
}
