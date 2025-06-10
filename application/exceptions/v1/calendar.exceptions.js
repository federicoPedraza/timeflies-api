const { HTTPError } = require("../../presentations");

class EventNotFoundException extends HTTPError {
    constructor() {
        super('Event not found', 404);
    }
}

class InvalidCreateEventParametersException extends HTTPError {
    constructor() {
        super('Invalid create event parameters', 400);
    }
}

class InvalidModifyEventParametersException extends HTTPError {
    constructor() {
        super('Invalid modify event parameters', 400);
    }
}

class GetEventsRangeTooLongException extends HTTPError {
    constructor() {
        super('Get events range too long', 400);
    }
}

class GetEventsRangeInvalidException extends HTTPError {
    constructor() {
        super('Get events range invalid', 400);
    }
}

class GetWeatherInvalidParametersException extends HTTPError {
    constructor() {
        super('Get weather invalid parameters', 400);
    }
}

class WeatherProviderException extends HTTPError {
    constructor() {
        super('Weather provider is not available', 500);
    }
}

module.exports = {
    EventNotFoundException,
    InvalidCreateEventParametersException,
    InvalidModifyEventParametersException,
    GetEventsRangeTooLongException,
    GetEventsRangeInvalidException,
    GetWeatherInvalidParametersException,
    WeatherProviderException
}
