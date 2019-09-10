const knex = require('../../database/db');



const checkClientExists = (clientId) => {
  return new Promise(async (resolve, reject) => {
    try {

      const response = await knex('clients')
        .select('client_id')
        .where({
          'client_id': clientId,
        });

      if (!Array.isArray(response)) {
        throw 'Error: checkClientExists() - failed to SELECT';
      }

      resolve(response.length > 0);

    } catch (error) {
      reject(error);
    }
  });
};



const insertClient = (clientId) => {
  return new Promise(async (resolve, reject) => {

    try {

      const response = await knex('clients')
        .insert({
          'client_id': clientId,
        });
      
      if (!Array.isArray(response)) {
        throw 'Error: insertClient() - failed to insert';
      }

      resolve({ clientId });

    } catch (error) {
      reject(error);
    }

  });
};



const updateClient = ({ clientId, data }) => {
  return new Promise(async (resolve, reject) => {

    try {

      const response = await knex('clients')
        .update(data)
        .where({
          'client_id': clientId,
        });

      if (typeof response !== 'number') {
        throw 'Error: updateClient() - failed to update';
      }

      resolve({
        clientId,
        ...data,
      });

    } catch (error) {
      reject(error);
    }

  });
};



const setClientName = async ({ clientId, name }) => {
  return await updateClient({
    clientId,
    data: {
      name,
    },
  });
};



const setClientSocket = ({ clientId, socketId }) => {
  return updateClient({
    clientId,
    data: {
      'socket_id': socketId,
    },
  });
};



const getClientById = (clientId) => {
  return new Promise(async (resolve, reject) => {

    try {

      const response = await knex('clients')
        .select([
          'client_id',
          'name',
          'socket_id',
          'location',
        ])
        .where({
          'client_id': clientId,
        });

      if (!Array.isArray(response)) {
        throw 'Error: updateClient() - failed to update';
      }

      resolve({
        ...response[0],
      });

    } catch (error) {
      reject(error);
    }

  });
};



module.exports = {
  checkClientExists,
  insertClient,

  getClientById,
  updateClient,
  setClientName,
  setClientSocket,
  checkClientExists,
};
