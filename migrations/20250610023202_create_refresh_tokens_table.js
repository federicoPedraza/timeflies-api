/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('refresh_tokens', function(table) {
        table.uuid('id').primary();
        table.uuid('user_id').notNullable();
        table.string('token').notNullable();
        table.timestamp('expires_at').notNullable();
        table.timestamps(true, true);

        // Add foreign key constraint
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('refresh_tokens');
};
