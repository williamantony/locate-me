const express = require('express');
const Router = express.Router();

const {
  initiate,
} = require('../middlewares');

const {
  createBeacon,
  getBeaconsByConnection,
  setBeaconUser,
} = require('../middlewares/beacons');

Router.route('/')
  .post(
    initiate,
    createBeacon,
  )

Router.route('/list')
  .post(
    initiate,
    getBeaconsByConnection,
  );

Router.route('/user')
  .post(
    initiate,
    setBeaconUser,
  );

module.exports = Router;
