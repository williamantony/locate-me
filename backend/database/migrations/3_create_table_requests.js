exports.up = async function(knex) {
  const tableExists = await knex.schema.hasTable('requests');
  if (!tableExists) {
    return knex.schema.createTable('requests', (table) => {

      table.uuid('request_id').primary();
      table.uuid('sender_id');
      table.uuid('receiver_id');
      table.json('location').defaultTo({});
      table.timestamps();

      table.foreign('sender_id').references('sender_id').inTable('senders');
      table.foreign('receiver_id').references('receiver_id').inTable('receivers');

    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('requests');
};
