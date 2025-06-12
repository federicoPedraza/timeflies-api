class UserSetting {
    constructor({ id, userId, timezone, weekStartsOnSunday, focusHourOnStart, timeNotation }) {
        this.id = id;
        this.userId = userId;
        this.timezone = timezone;
        this.weekStartsOnSunday = weekStartsOnSunday;
        this.focusHourOnStart = focusHourOnStart;
        this.timeNotation = timeNotation;
    }
}

module.exports = UserSetting;
