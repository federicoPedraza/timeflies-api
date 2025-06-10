class WeatherAPIForecast {
    constructor({
        location,
        current,
        forecast
    }) {
        this.location = {
            name: location.name,
            region: location.region,
            country: location.country,
            lat: location.lat,
            lon: location.lon,
            tz_id: location.tz_id,
            localtime_epoch: location.localtime_epoch,
            localtime: location.localtime
        };

        this.current = {
            last_updated_epoch: current.last_updated_epoch,
            last_updated: current.last_updated,
            temp_c: current.temp_c,
            temp_f: current.temp_f,
            is_day: current.is_day,
            condition: {
                text: current.condition.text,
                icon: current.condition.icon,
                code: current.condition.code
            },
            wind_mph: current.wind_mph,
            wind_kph: current.wind_kph,
            wind_degree: current.wind_degree,
            wind_dir: current.wind_dir,
            pressure_mb: current.pressure_mb,
            pressure_in: current.pressure_in,
            precip_mm: current.precip_mm,
            precip_in: current.precip_in,
            humidity: current.humidity,
            cloud: current.cloud,
            feelslike_c: current.feelslike_c,
            feelslike_f: current.feelslike_f,
            windchill_c: current.windchill_c,
            windchill_f: current.windchill_f,
            heatindex_c: current.heatindex_c,
            heatindex_f: current.heatindex_f,
            dewpoint_c: current.dewpoint_c,
            dewpoint_f: current.dewpoint_f,
            vis_km: current.vis_km,
            vis_miles: current.vis_miles,
            uv: current.uv,
            gust_mph: current.gust_mph,
            gust_kph: current.gust_kph
        };

        this.forecast = {
            forecastday: forecast.forecastday.map(day => ({
                date: day.date,
                date_epoch: day.date_epoch,
                day: {
                    maxtemp_c: day.day.maxtemp_c,
                    maxtemp_f: day.day.maxtemp_f,
                    mintemp_c: day.day.mintemp_c,
                    mintemp_f: day.day.mintemp_f,
                    avgtemp_c: day.day.avgtemp_c,
                    avgtemp_f: day.day.avgtemp_f,
                    maxwind_mph: day.day.maxwind_mph,
                    maxwind_kph: day.day.maxwind_kph,
                    totalprecip_mm: day.day.totalprecip_mm,
                    totalprecip_in: day.day.totalprecip_in,
                    totalsnow_cm: day.day.totalsnow_cm,
                    avgvis_km: day.day.avgvis_km,
                    avgvis_miles: day.day.avgvis_miles,
                    avghumidity: day.day.avghumidity,
                    daily_will_it_rain: day.day.daily_will_it_rain,
                    daily_chance_of_rain: day.day.daily_chance_of_rain,
                    daily_will_it_snow: day.day.daily_will_it_snow,
                    daily_chance_of_snow: day.day.daily_chance_of_snow,
                    condition: {
                        text: day.day.condition.text,
                        icon: day.day.condition.icon,
                        code: day.day.condition.code
                    },
                    uv: day.day.uv
                },
                astro: {
                    sunrise: day.astro.sunrise,
                    sunset: day.astro.sunset,
                    moonrise: day.astro.moonrise,
                    moonset: day.astro.moonset,
                    moon_phase: day.astro.moon_phase,
                    moon_illumination: day.astro.moon_illumination,
                    is_moon_up: day.astro.is_moon_up,
                    is_sun_up: day.astro.is_sun_up
                },
                hour: day.hour.map(hour => ({
                    time_epoch: hour.time_epoch,
                    time: hour.time,
                    temp_c: hour.temp_c,
                    temp_f: hour.temp_f,
                    is_day: hour.is_day,
                    condition: {
                        text: hour.condition.text,
                        icon: hour.condition.icon,
                        code: hour.condition.code
                    },
                    wind_mph: hour.wind_mph,
                    wind_kph: hour.wind_kph,
                    wind_degree: hour.wind_degree,
                    wind_dir: hour.wind_dir,
                    pressure_mb: hour.pressure_mb,
                    pressure_in: hour.pressure_in,
                    precip_mm: hour.precip_mm,
                    precip_in: hour.precip_in,
                    snow_cm: hour.snow_cm,
                    humidity: hour.humidity,
                    cloud: hour.cloud,
                    feelslike_c: hour.feelslike_c,
                    feelslike_f: hour.feelslike_f,
                    windchill_c: hour.windchill_c,
                    windchill_f: hour.windchill_f,
                    heatindex_c: hour.heatindex_c,
                    heatindex_f: hour.heatindex_f,
                    dewpoint_c: hour.dewpoint_c,
                    dewpoint_f: hour.dewpoint_f,
                    will_it_rain: hour.will_it_rain,
                    chance_of_rain: hour.chance_of_rain,
                    will_it_snow: hour.will_it_snow,
                    chance_of_snow: hour.chance_of_snow,
                    vis_km: hour.vis_km,
                    vis_miles: hour.vis_miles,
                    gust_mph: hour.gust_mph,
                    gust_kph: hour.gust_kph,
                    uv: hour.uv
                }))
            }))
        };
    }
}

module.exports = {
    WeatherAPIForecast
}
