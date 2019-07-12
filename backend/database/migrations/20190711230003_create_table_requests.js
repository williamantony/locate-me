
exports.up = async function(knex) {
  const tableExists = await knex.schema.hasTable('requests');
  if (!tableExists) {
    return knex.schema.createTable('requests', (table) => {

      table.uuid('id');
      table.uuid('sender_id');
      table.uuid('receiver_id');
      table.json('location');
      table.timestamps();

    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('requests');
};
