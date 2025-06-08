class TimeEvent {
    constructor({ id, authorId, title, description, start, end, createdAt, updatedAt }) {
        this.id = id
        this.authorId = authorId
        this.title = title
        this.description = description
        this.start = start
        this.end = end
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

module.exports = TimeEvent
