const express = require('express');
const uuid = require('uuid/v4');

const Router = express.Router();

const knex = require('../../database/db');

Router.route('/request')
  .post(async (req, res) => {

    const { phone, sender_id } = req.body;
    const request_id = uuid();
    const receiver_id = uuid();

    try {
      await knex('requests').insert({
        request_id,
        sender_id,
        receiver_id,
      });
    } catch (error) {
      console.log(error);
    }

    try {
      await knex('senders').insert({
        sender_id,
      });
    } catch (error) {
      
    }

    try {
      await knex('receivers').insert({
        receiver_id,
        phone,
      });      
    } catch (error) {
      
    }

    // Implement SMS API

  });

module.exports = Router;
