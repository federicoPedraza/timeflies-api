const { userSettingRepository } = require('../../../../infrastructure/repositories/postgresql');

class GetUserSettingsUseCase {
    async execute({ id }) {
        const userSetting = await userSettingRepository.findByUserId(id);
        return userSetting;
    }
}

module.exports = GetUserSettingsUseCase;
