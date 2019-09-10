const socketIO = require('socket.io');
const setEvents = require('./events');

/**
 * @param server Socket.io requires native http server 
 * instead of Express server
 */

const connect = server => {

  const io = socketIO(server, {
    path: '/location',
  });

  io.on('connection', (socket) => {

    socket.on('disconnect', (reason) => {
      console.log('Disconnecting', socket.id, reason);
    });

    setEvents(socket);

  });

  return io;

};



const addToExpress = socketConnection => (req, res, next) => {
  let socket = null;

  socketConnection.on('connection', (socketInstance) => {
    socket = socketInstance;
  });

  req._ = {
    io: socketConnection,
    socket,
  };

  next();
};



module.exports = {
  connect,
  addToExpress,
};
