class RefreshToken {
    constructor({ id, userId, token, expiresAt }) {
        this.id = id;
        this.user_id = userId;
        this.token = token;
        this.expiresAt = expiresAt;
    }
}

module.exports = RefreshToken;
