const { weatherRepository } = require('../../../../infrastructure/repositories/');
const { GetWeatherInvalidParametersException, WeatherProviderException } = require('../../../exceptions/v1/calendar.exceptions');

class GetWeatherUseCase {
    async execute(city, forecastDays) {
        if (!city || !forecastDays)
            throw new GetWeatherInvalidParametersException();

        if (forecastDays > 10)
            forecastDays = 10; // just in case the user wants to see more than 10 days

        try {
            const weather = await weatherRepository.getForecast(city, forecastDays);

            let days = [];

            for (const day of weather.forecast.forecastday) {
                const condition = day.day.condition.text.toLowerCase();
                const precip = day.day.totalprecip_mm;
                const wind = day.day.maxwind_kph;
                const vis = day.day.avgvis_km;

                const priorities = [
                    { type: 'rainy', check: () => precip > 0.1 },
                    { type: 'snowy', check: () => condition.includes('snow') },
                    { type: 'foggy', check: () => vis < 4 },
                    { type: 'stormy', check: () => condition.includes('storm') || condition.includes('thunder') },
                    { type: 'windy', check: () => wind >= 25 },
                    { type: 'cloudy', check: () => condition.includes('cloud') || condition.includes('overcast') },
                    { type: 'sunny', check: () => condition.includes('sun') || condition.includes('clear') },
                    { type: 'unknown', check: () => true }
                ];

                const matched = priorities.find(p => p.check());
                const weatherType = matched ? matched.type : 'unknown';

                days.push({
                    date: day.date,
                    minTempC: day.day.mintemp_c,
                    maxTempC: day.day.maxtemp_c,
                    weatherType
                });
            }
            return days;
        } catch (error) {
            console.error(error);
            throw new WeatherProviderException();
        }
    }
}

module.exports = GetWeatherUseCase;
