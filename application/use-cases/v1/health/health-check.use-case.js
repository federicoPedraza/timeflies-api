class HealthCheckUseCase {
    async execute() {
        return {
            message: 'OK'
        }
    }
}

module.exports = HealthCheckUseCase;
