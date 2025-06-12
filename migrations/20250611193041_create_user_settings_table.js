/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('user_settings', (table) => {
            table.uuid('id').primary();
            table.uuid('user_id').notNullable();
            table.string('timezone').notNullable();
            table.boolean('week_starts_on_sunday').notNullable();
            table.boolean('focus_hour_on_start').notNullable();
            table.string('time_notation').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
    };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('user_settings');
};
