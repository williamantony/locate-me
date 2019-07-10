require('dotenv').config();

const express =  require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const nodemailer = require('nodemailer');

const server = express();
server.use(bodyParser.json());
server.use(cors());
morgan("combined");

const {
  PORT,
  SMTP_EMAIL,
  SMTP_PASSWORD,
  TEST_EMAIL_TO,
} = process.env;

server.post('/mail', async (req, res) => {
  
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

    let transporter = nodemailer.createTransport(smtpConfig);

    const email = {
      from: SMTP_EMAIL,
      to: TEST_EMAIL_TO,
      subject: "Hello ",
      text: "Hello world?",
    };

    const info = await transporter.sendMail(email);

    res.json({
      id: info.messageId,
    })

  } catch (error) {
    res.json({
      error,
    });
  }

});



server.post('/request-status', (req, res) => {

  const { requestId, status } = req.body;

  res.json({
    requestId,
    status,
  });

});



server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
});
