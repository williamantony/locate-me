const router = {
  location: require('./location.routes'),
};

module.exports = server => {

  server.use('/location', router.location);

};
