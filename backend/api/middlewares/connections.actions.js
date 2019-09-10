const knex = require('../../database/db');

const insertConnection = ({ connectionId, clientId, name }) => {
  return new Promise(async (resolve, reject) => {
    
    try {
      
      const response = await knex('connections')
        .insert({
          'connection_id': connectionId,
          'created_by': clientId,
          'name': name,
        });

      if (!Array.isArray(response)) {
        throw 'Error: insertConnection() - failed to insert';
      }

      resolve({
        'connection_id': connectionId,
      });

    } catch (error) {
      reject(error);
    }

  });
};



const updateConnection = ({ connectionId, data }) => {
  return new Promise(async (resolve, reject) => {
    
    try {

      const response = await knex('connections')
        .update(data)
        .where({
          'connection_id': connectionId,
        });

      if (typeof response !== 'number') {
        throw 'Error: updateConnection() - failed to update';
      }

      resolve({
        'connection_id': connectionId,
        ...data,
      });

    } catch (error) {
      reject(error);
    }

  });
};



const updateConnectedClients = ({ connectionId, clientId, data }) => {
  return new Promise(async (resolve, reject) => {
    
    try {

      const response = await knex('connected_clients')
        .update(data)
        .where({
          'connection_id': connectionId,
          'client_id': clientId,
        });

      if (typeof response !== 'number') {
        throw 'Error: updateConnectedClients() - failed to update';
      }

      resolve({
        'connection_id': connectionId,
        ...data,
      });

    } catch (error) {
      reject(error);
    }

  });
};



const addClientToConnection = ({ connectionId, clientId }) => {
  return new Promise(async (resolve, reject) => {
    
    try {

      const response = await knex('connected_clients')
        .insert({
          connectionId,
          clientId,
        });

      if (!Array.isArray(response)) {
        throw 'Error: insertConnection() - failed to insert';
      }

      resolve({
        clientId,
        'connection_id': connectionId,
      });

    } catch (error) {
      reject(error);
    }

  });
};



const removeClientFromConnection = async ({ connectionId, clientId }) => {
  return await updateConnectedClients({
    connectionId,
    clientId,
    data: {
      status: 'disconnected',
    },
  });
};



const closeConnection = async ({ connectionId }) => {
  return await updateConnection({
    connectionId,
    data: {
      status: 'closed',
    },
  });
};



const checkInviteCodeExists = (inviteCode) => {
  return new Promise(async (resolve, reject) => {
    
    try {
      
      const response = await knex('connected_clients')
        .select('invite_code')
        .where({
          'invite_code': inviteCode,
        });

      if (!Array.isArray(response)) {
        throw 'Error: checkInviteCodeExists() - failed to select';
      }

      const inviteCodeExists = response.length > 0;
      resolve(inviteCodeExists);

    } catch (error) {
      reject(error);
    }

  });
};



const insertConnectionInstance = ({ connectionId, inviteCode, name }) => {
  return new Promise(async (resolve, reject) => {
    
    try {
      
      const response = await knex('connected_clients')
        .insert({
          'connection_id': connectionId,
          'invite_code': inviteCode,
          'name': name,
        });

      if (!Array.isArray(response)) {
        throw 'Error: insertConnectionInstance() - failed to insert';
      }

      resolve({
        'connection_id': connectionId,
        inviteCode,
        name,
      });

    } catch (error) {
      reject(error);
    }

  });
};



const getConnections = (clientId) => {
  return new Promise(async (resolve, reject) => {

    try {

      const response = await knex('connections')
        .select([
          'connection_id',
          'status',
          'name',
        ])
        .where({
          'created_by': clientId,
        });

      if (!Array.isArray(response)) {
        throw 'Error: getConnections() - failed to select';
      }

      resolve(response);

    } catch (error) {
      reject(error);
    }

  });
};



const getConnectedClients = (connectionId) => {
  return new Promise(async (resolve, reject) => {
    
    try {

      const response = await knex('connected_clients')
        .select([
          'connection_id',
          'client_id',
          'name',
          'invite_code',
          'status',
        ])
        .where({
          'connection_id': connectionId,
        });

      if (!Array.isArray(response)) {
        throw 'Error: getConnectedClients() - failed to select';
      }

      resolve(response);

    } catch (error) {
      reject(error);
    }

  });
};



module.exports = {
  insertConnection,
  updateConnection,
  updateConnectedClients,
  addClientToConnection,
  removeClientFromConnection,
  closeConnection,
  checkInviteCodeExists,
  insertConnectionInstance,

  getConnections,
  getConnectedClients,
};
