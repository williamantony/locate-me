exports.up = async function(knex) {
  const tableExists = await knex.schema.hasTable('senders');
  if (!tableExists) {
    return knex.schema.createTable('senders', (table) => {

      table.uuid('sender_id').primary();
      table.string('connection');

    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('senders');
};
