
exports.up = function(knex, Promise) {
    return knex.schema.table('books', function(table) {
        table.string('catagory');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.droptable('books');
};
