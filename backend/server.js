require('dotenv').config();

const fs = require('fs');
const https = require('https');

const express =  require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const webSocket = require('./socket');
const setRoutes = require('./api/routes/routes');

const {
  PORT,
  WS_PORT,
} = process.env;



const log = console.log;

console.log = (...args) => {
  if (process.env.DEBUG === 'true')
    log.apply(console, args);
};



/**
 * HTTP Server for Websocket
 * on a separate Port.
 */

const httpServer = https.createServer({
  key: fs.readFileSync('ssl/socket/server.key'),
  cert: fs.readFileSync('ssl/socket/server.cert'),
});
const socketConnection = webSocket.connect(httpServer);

httpServer.listen(WS_PORT, () => {
  console.log(`Server is listening on http://localhost:${WS_PORT}`)
});



/**
 * Express Server for REST APIs
 * on a separate Port.
 */

const server = express();

const secureServer = https.createServer({
  key: fs.readFileSync('ssl/rest/server.key'),
  cert: fs.readFileSync('ssl/rest/server.cert'),
}, server);

server.use(bodyParser.json());
server.use(cors());
server.use(morgan("tiny"));
server.use(webSocket.addToExpress(socketConnection));

setRoutes(server);

secureServer.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
});
