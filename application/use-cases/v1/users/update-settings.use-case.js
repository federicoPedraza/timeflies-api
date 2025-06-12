const { UserNotFoundException, UserNotAuthorizedException } = require('../../../exceptions/v1/user.exceptions');
const { userRepository, userSettingRepository } = require('../../../../infrastructure/repositories/postgresql');

class UpdateSettingsUseCase {
    async execute(user, settings) {
        const foundUser = await userRepository.findById(user.id);

        if (!foundUser) {
            throw new UserNotFoundException();
        }

        const settingsToUpdate = {
            timezone: settings.timezone,
            week_starts_on_sunday: settings.weekStartsOnSunday,
            focus_hour_on_start: settings.focusHourOnStart,
            time_notation: settings.timeNotation
        };

        await userSettingRepository.update(foundUser.id, settingsToUpdate);

        return {
            message: 'Settings updated successfully'
        };
    }
}

module.exports = UpdateSettingsUseCase;
