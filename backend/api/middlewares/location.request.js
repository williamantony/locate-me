const uuid = require('uuid/v4');
const nodemailer = require('nodemailer');
const knex = require('../../database/db');



const initiateLocationRequest = (req, res, next) => {

  const {
    SMTP_EMAIL,
    SMTP_PASSWORD,
    TEST_EMAIL_TO,
    TEST_SHORTURL_API_KEY,
    NGROK_URL,
  } = process.env;


  const _data = {
    SMTP_EMAIL,
    SMTP_PASSWORD,
    TEST_EMAIL_TO,
    TEST_SHORTURL_API_KEY,
    NGROK_URL,
  };

  req._ = {
    ...req._,
    ..._data,
  };

  next();

};



const processLocationRequest = async (req, res, next) => {

  console.log(req._.socket);

  const { NGROK_URL } = req._;

  const { phone, sender_id } = req.body;
  const request_id = uuid();
  const receiver_id = uuid();

  req._.receiver_id = receiver_id;
  req._.request_id = request_id;

  req._.request_url = `${NGROK_URL}/request/${request_id}/`;


  try {

    /**
     * Upsert Sender
     */
    const existingSender = await knex('senders')
      .select('sender_id')
      .where({ sender_id });

    console.log(existingSender);

    if (existingSender.length === 0) {
      await knex('senders').insert({
        sender_id,
      });
    }

    /**
     * Add Receiver
     */
    await knex('receivers').insert({
      receiver_id,
      phone,
    });

    /**
     * Add New Request
     */
    await knex('requests').insert({
      request_id,
      sender_id,
      receiver_id,
    });
    
    next();

  } catch (error) {
    console.log(error);
  }

};



const sendEmail = async (req, res, next) => {
  
  const {
    SMTP_EMAIL,
    SMTP_PASSWORD,
    TEST_EMAIL_TO,
    request_url,
  } = req._;

  try {

    const smtpConfig = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    };

    console.log('Implement User\'s Name');

    const message = `William is requesting your location. ${request_url}`;

    let transporter = nodemailer.createTransport(smtpConfig);

    const email = {
      from: SMTP_EMAIL,
      to: TEST_EMAIL_TO,
      subject: "LocateMe App: Request",
      text: message,
    };

    const info = await transporter.sendMail(email);

    req._.emailConfirmation = info;

    next();

  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }

};



const sendRequestId = (req, res) => {

  const {
    request_id
  } = req._;

  res.json({
    request_id,
  });

};



module.exports = {
  initiateLocationRequest,
  sendEmail,
  processLocationRequest,
  sendRequestId,
};
