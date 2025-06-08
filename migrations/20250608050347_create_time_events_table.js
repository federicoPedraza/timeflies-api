/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('time_events', (table) => {
        table.uuid('id').primary();
        table.uuid('author_id').references('id').inTable('users');
        table.string('title');
        table.string('description');
        table.dateTime('start');
        table.dateTime('end');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('time_events');
};
