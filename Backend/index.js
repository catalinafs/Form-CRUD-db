//* Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//* Middlewares
const { validRegister } = require('./middlewares/validRegister');
const { validLogin } = require('./middlewares/validLogin');
const { validToken } = require('./middlewares/validToken');

//* Controllers
const { RegisterUser } = require('./controllers/registerUser');
const { EncodeData } = require('./controllers/encode');
const { DecodeData } = require('./controllers/decode');

//* db
const db = require('./config/instance');

//* Constant variables
const app = express();
const port = process.env.PORT;

//* App use
app.use(bodyParser.json());
app.use(cors());

require('./config/models');

//* DB
db.sync().then(() => console.log('base de datos conectada'));

//? POST: register user
app.post('/register', validRegister, RegisterUser);

//? POST: encode endpoint
app.post('/encode', validLogin, EncodeData);

//? POST: decode endpoint
app.post('/decode', validToken, DecodeData);

//* Listening app
app.listen(port, () => {
    console.log('its working on port: ' + port);
});