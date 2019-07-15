const express = require('express');
const Router = express.Router();

const {
  initiate,
} = require('../middlewares');

const {
  initiateLocationRequest,
  processLocationRequest,
  sendEmail,
  sendRequestId,
} = require('../middlewares/location.request');

Router.route('/request')
  .post(
    initiate,
    initiateLocationRequest,
    processLocationRequest,
    sendEmail,
    sendRequestId,
  );

module.exports = Router;
