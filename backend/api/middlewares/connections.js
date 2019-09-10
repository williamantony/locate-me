const uuid = require('uuid/v4');
const {
  checkInviteCodeExists,
  insertConnection,
  insertConnectionInstance,
  getConnections,
  getConnectedClients,
} = require('../middlewares/connections.actions');

const {
  sendError,
  sendSuccess,
} = require('../response');

const {
  missingParameter,
} = require('../errors');



const createRandomString = (length = 5) => {
  return Math.random().toString(36).substr(2, length).toUpperCase();
};



const createInviteCodeString = () => {
  const part1 = createRandomString(3);
  const part2 = createRandomString(3);
  const part3 = createRandomString(3);
  return `${part1}-${part2}-${part3}`;
};



const createInviteCode = () => {
  return new Promise((resolve, reject) => {

    const recur = async () => {
      try {

        const inviteCode = createInviteCodeString();
        const inviteCodeExists = await checkInviteCodeExists(inviteCode);

        if (inviteCodeExists) return recur();
        resolve(inviteCode);

      } catch (error) {
        console.log(error.message);
        reject('Error: createInviteCode()');
      }
    };

    recur();
  });
};



const createConnection = async (req, res, next) => {
  try {

    const { clientId, name } = req.body;

    if (!clientId) {
      throw missingParameter('req.body.clientId');
    }

    const connectionId = uuid();

    const newConnection = await insertConnection({
      clientId,
      connectionId,
      name,
    });
    
    sendSuccess(newConnection)(res);
  
  } catch (error) {
    sendError(error.message)(res);
  }
};



const createConnectionInstance = async (req, res, next) => {

  const { connectionId, name } = req.body;

  const inviteCode = await createInviteCode();

  const newConnection = await insertConnectionInstance({
    connectionId,
    inviteCode,
    name,
  });

  if (!Array.isArray(newConnection)) {
    // throw new Error('');
  }
  
  const connectedClients = await getConnectedClients(connectionId);

  res.json({
    connectedClients,
  });

};



const getConnectionsOrCreateFirst = async (req, res, next) => {
  try {

    const { clientId } = req.body;

    const connections = await getConnections(clientId);

    if (connections.length === 0) {

      const connectionId = uuid();

      const newConnection = await insertConnection({
        clientId,
        connectionId,
        name: 'Default Connection',
      });

      console.log('newConnection', newConnection);

      res.json({
        connections: [
          newConnection
        ],
      });

    } else {

      res.json({
        connections,
      });

    }

  } catch (error) {
    console.log(error);
  }
};



const getConnectionInstances = async (req, res, next) => {
  try {
    
    const { connectionId } = req.body;

    const connections = await getConnectedClients(connectionId);

    res.json({
      connectedClients: connections,
    });

  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  createConnection,
  createConnectionInstance,
  getConnectionsOrCreateFirst,
  getConnectionInstances,
};
