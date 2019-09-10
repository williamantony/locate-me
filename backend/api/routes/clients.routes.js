const express = require('express');
const Router = express.Router();

const {
  initiate,
} = require('../middlewares');

const {
  createClient,
  setClientName,
} = require('../middlewares/clients');

Router.route('/')
  .post(
    initiate,
    createClient,
  );
  
Router.route('/name')
  .post(
    initiate,
    setClientName,
  );

module.exports = Router;
