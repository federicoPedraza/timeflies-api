const UserRepository = require('./user.repository');
const TimeEventRepository = require('./time-event.repository');

module.exports = {
    userRepository: new UserRepository(),
    timeEventRepository: new TimeEventRepository()
}
