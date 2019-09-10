exports.up = async function(knex) {
  const tableExists = await knex.schema.hasTable('connected_clients');
  if (!tableExists) {
    return knex.schema.createTable('connected_clients', (table) => {

      table.uuid('connection_id').notNullable();
      table.uuid('client_id');
      table.string('name').notNullable();
      table.string('invite_code').primary();
      table.string('status').defaultTo('created');

      table.foreign('connection_id').references('connection_id').inTable('connections');
      table.foreign('client_id').references('client_id').inTable('clients');

    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('connected_clients');
};
