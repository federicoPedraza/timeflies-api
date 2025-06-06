class User {
	constructor({ id, name, email, password, createdAt = new Date(), updatedAt = new Date() }) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}

module.exports = User;
