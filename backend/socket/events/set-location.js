const knex = require('../../database/db');

module.exports = socket => {
  return async (data) => {
    
    try {

      const { clientId, location } = data;

      await knex('clients')
        .update({
          socket_id: socket.id,
          location: JSON.stringify(location),
        })
        .where({
          'client_id': clientId,
        });


      const response = await knex('connected_clients')
        .join('connections', 'connections.connection_id', '=', 'connected_clients.connection_id')
        .join('clients', 'clients.client_id', '=', 'connections.created_by')
        .select([
          'clients.socket_id',
          'connected_clients.invite_code',
        ])
        .where({
          'connected_clients.client_id': clientId,
        });
        
      if (response.length === 1) {
      
        const beacon = response[0].invite_code;
        const requestedSocket = response[0].socket_id;

        console.log('SET')

        socket.to(requestedSocket).emit('location-update', {
          location,
          beacon,
        });
      
      }

    } catch (error) {
      console.log(error);
    }

  }
};
