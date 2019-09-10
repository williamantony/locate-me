const knex = require('../../database/db');

/* Sets Socket ID of the Client/User */
module.exports = socket => {
  return async (data) => {
    
    try {

      const { client } = data;

      await knex('clients')
        .update({
          'socket_id': socket.id,
        })
        .where({
          'client_id': client,
        });

    } catch (error) {
      console.log(error);
    }

  };
};
