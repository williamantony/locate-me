const express =  require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');



const server = express();
server.use(bodyParser.json());
server.use(cors());
morgan("combined");


server.get('/', (req, res) => {
  res.send("Testing")
})

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
});