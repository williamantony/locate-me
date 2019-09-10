exports.up = async function(knex) {
  const tableExists = await knex.schema.hasTable('clients');
  if (!tableExists) {
    return knex.schema.createTable('clients', (table) => {

      table.uuid('client_id').primary();
      table.string('name');
      table.string('socket_id');
      table.json('location');
      table.timestamps(true, true);

    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('clients');
};
