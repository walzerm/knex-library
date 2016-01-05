
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', function(table) {
        table.increments();
        table.string('name');
        table.float('authorID');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('books');
};
