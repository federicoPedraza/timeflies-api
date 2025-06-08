class TimeEvent {
    constructor({ id, authorId, title, description, start, end, createdAt, updatedAt }) {
        this.id = id
        this.author_id = authorId
        this.title = title
        this.description = description
        this.start = start
        this.end = end
        this.created_at = createdAt
        this.updated_at = updatedAt
    }
}

module.exports = TimeEvent
