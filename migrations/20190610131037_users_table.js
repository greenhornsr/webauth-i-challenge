exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(tbl) {
        tbl.increments()
        tbl
        .string('username', 64)
        .unique()
        .notNullable()

        tbl
        .string('password', 255)
        .notNullable()

        tbl
        .timestamp('createdAt')
        .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
};
