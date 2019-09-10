const events = {
  'set-location': require('./set-location'),
  'set-connection': require('./set-connection'),
};

module.exports = socket => {

  Object.keys(events).forEach(name => {
    socket.on(name, events[name](socket));
  });

};
