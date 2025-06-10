const { WeatherAPIForecast } = require('../../domain/presentations');

class WeatherRepository {
    static baseUrl = 'http://api.weatherapi.com/v1/';

    buildUrl(endpoint, city, days) {
        return `${WeatherRepository.baseUrl}${endpoint}?key=${process.env.WEATHER_API_KEY}&q=${city}&days=${days}`;
    }

    async getForecast(city, days) {
        const url = this.buildUrl(`forecast.json`, city, days);
        const response = await fetch(url);
        const data = await response.json();

        return new WeatherAPIForecast(data);
    }
}

module.exports = WeatherRepository;
