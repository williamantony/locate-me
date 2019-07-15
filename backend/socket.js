const socket = require('socket.io');
const knex = require('./database/db');



/**
 * @param server Socket.io requires native http server 
 * instead of Express server
 */

const connect = server => {

  const io = socket(server, {
    path: '/location',
  });

  io.on('connection', (socket) => {
    console.log('Socket.io connected', socket.id);

    socket.on('first-contact', async (data) => {
      const {
        request_id,
        client_id,
      } = data;

      await knex('senders')
        .update({
          connection: socket.id,
        })
        .where({
          sender_id: client_id,
        });

    });

    socket.on('location-coordinates', (data) => {
      console.log(data);
    });

  });

  return io;

};



const addToExpress = (socketConnection) => (req, res, next) => {
  let socket = null;

  socketConnection.on('connection', (socketInstance) => {
    socket = socketInstance;
  });

  req._ = {
    io: socketConnection,
    socket,
  };

  next();
}



module.exports = {
  connect,
  addToExpress,
};
