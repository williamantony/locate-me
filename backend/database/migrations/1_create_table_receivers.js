exports.up = async function(knex) {
  const tableExists = await knex.schema.hasTable('receivers');
  if (!tableExists) {
    return knex.schema.createTable('receivers', (table) => {

      table.uuid('receiver_id').primary();
      table.string('phone', 16);
      table.string('connection');

    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('receivers');
};
