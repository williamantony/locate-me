const knex = require('../../database/db');

const insertBeacon = ({ connectionId, inviteCode, name }) => {
  return new Promise(async (resolve, reject) => {
    
    try {
      
      const insertRequest = await knex('connected_clients')
        .insert({
          'connection_id': connectionId,
          'invite_code': inviteCode,
          'name': name,
        });

      if (!Array.isArray(insertRequest)) {
        throw 'Error: insertConnectionInstance() - failed to insert';
      }

      const beacon = await selectBeacon({
        'invite_code': inviteCode,
      });

      resolve(beacon[inviteCode]);

    } catch (error) {
      reject(error);
    }

  });
};



const updateBeacon = (updateSet = {}, whereClause = {}) => {
  return new Promise(async (resolve, reject) => {
    
    try {
      
      const response = await knex('connected_clients')
        .update(updateSet)
        .where(whereClause);

      if (response !== 1) {
        throw 'Error: insertConnectionInstance() - failed to insert';
      }

      resolve({
        success: true,
      });

    } catch (error) {
      reject(error);
    }

  });
};



const selectBeacon = (whereClause = {}) => {
  return new Promise(async (resolve, reject) => {

    try {

      const response = await knex('connected_clients')
        .leftJoin('clients', 'clients.client_id', '=', 'connected_clients.client_id')
        .select([
          'connected_clients.invite_code as id',
          'connected_clients.name as name',
          'connected_clients.status as status',
          'connected_clients.connection_id as connection',
          'connected_clients.client_id as client',
          'connected_clients.invite_code as inviteCode',

          'clients.socket_id as socket',
          'clients.location as location',
        ])
        .where(whereClause);

      const beacons = response.reduce((beaconsObject, beacon) => {
        return {
          ...beaconsObject,
          [beacon.id]: beacon,
        };
      }, {});

      resolve(beacons);

    } catch (error) {
      reject(`Error :: ${error.message}`);
    }

  });
};



module.exports = {
  insertBeacon,
  updateBeacon,
  selectBeacon,
};
