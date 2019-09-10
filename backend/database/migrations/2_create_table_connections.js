exports.up = async function(knex) {
  const tableExists = await knex.schema.hasTable('connections');
  if (!tableExists) {
    return knex.schema.createTable('connections', (table) => {

      table.uuid('connection_id').primary();
      table.uuid('created_by').notNullable();
      table.string('name').notNullable();
      table.string('status').defaultTo('created');
      table.timestamps(true, true);

    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('connections');
};
