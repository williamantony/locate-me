const router = {
  client: require('./clients.routes'),
  connections: require('./connections.routes'),
  beacons: require('./beacons.routes'),
};

module.exports = server => {

  server.use('/clients', router.client);
  server.use('/connections', router.connections);
  server.use('/beacons', router.beacons);

};
