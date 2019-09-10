const uuid = require('uuid/v4');

const {
  insertClient,
  updateClient,
  getClientById,
  checkClientExists,
} = require('./clients.actions');

const {
  sendSuccess,
  sendError,
} = require('../response');

const {
  missingParameter,
} = require('../errors');



const createClient = async (req, res, next) => {
  try {

    const clientId = req.body.clientId || uuid();

    const client = {
      clientId,
      newClient: false,
    };

    if (!await checkClientExists(clientId)) {
      client.newClient = true;
      await insertClient(clientId);
    }

    const clientInfo = await getClientById(clientId);
    const { name, socket_id, location } = clientInfo;

    sendSuccess({
      ...client,
      name,
      socket: socket_id,
      location: JSON.parse(location),
    })(res);

  } catch (error) {
    sendError(error.message)(res);
  }
};



const setClientName = async (req, res, next) => {
  try {

    const { clientId, name, socket } = req.body;

    const client = await updateClient({
      clientId,
      data: {
        name,
        socket_id: socket,
      },
    });

    sendSuccess(client)(res);

  } catch (error) {
    sendError(error.message)(res);
  }
};



module.exports = {
  createClient,
  setClientName,
};
