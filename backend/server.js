require('dotenv').config();

const express =  require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const webSocket = require('./socket');
const setRoutes = require('./api/routes/routes');

const {
  PORT,
  WS_PORT,
} = process.env;



/**
 * HTTP Server for Websocket
 * on a separate Port.
 */

const httpServer = http.createServer();
const socketConnection = webSocket.connect(httpServer);

httpServer.listen(WS_PORT, () => {
  console.log(`Server is listening on http://localhost:${WS_PORT}`)
});



/**
 * Express Server for REST APIs
 * on a separate Port.
 */

const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use(morgan("tiny"));
server.use(webSocket.addToExpress(socketConnection));

setRoutes(server);

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
});
