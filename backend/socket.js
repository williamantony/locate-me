const socket = require('socket.io');

/**
 * @param server Socket.io requires native http server 
 * instead of Express server
 */
module.exports = server => {

  const io = socket(server, {
    path: '/location',
  });
  
  io.on('connection', (socket) => {
    console.log('Socket.io connected', socket.id);

    socket.on('location-coordinates', (data) => {
      console.log(data);

      
    });

  });

};
