const express = require('express');
const Router = express.Router();

const {
  initiate,
} = require('../middlewares');

const {
  getConnectionsOrCreateFirst,
} = require('../middlewares/connections');

Router.route('/list')
  .post(
    initiate,
    getConnectionsOrCreateFirst,
  );

module.exports = Router;
