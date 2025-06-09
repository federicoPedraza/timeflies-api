class LoggedUser {
    constructor({ id, name, email }) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    toJwtPayload() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        };
    }
}

module.exports = LoggedUser;
