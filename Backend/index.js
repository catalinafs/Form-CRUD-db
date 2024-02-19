//* Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//* Middlewares
const validRegister = require('./middlewares/validRegister');
const validLogin = require('./middlewares/validLogin');
const validToken = require('./middlewares/validToken');
const validImgProfile = require('./middlewares/validImgProfile');
const validPlace = require('./middlewares/validPlace');
const validVisit = require('./middlewares/validVisit');

//* Controllers
const RegisterUser = require('./controllers/registerUser');
const EncodeData = require('./controllers/encode');
const DecodeData = require('./controllers/decode');
const ImageProfile = require('./controllers/imageProfile');
const RegisterPlace = require('./controllers/registerPlace');
const RegisterVisit = require('./controllers/registerVisit');
const GetUsersPlace = require('./controllers/getUsersPlace');
const GetPlacesUser = require('./controllers/getPlacesUser');

//* db import
const db = require('./db/instance');

//* Constant variables
const app = express();
const port = process.env.PORT;

//* App use
app.use(bodyParser.json());
app.use(cors());

//* DB Model Tables
const User = require('./db/models/user');
const Place = require('./db/models/place');
const Visit = require('./db/models/visit');

//* DB Sync
db.sync().then(() => console.log('base de datos conectada'));

//? POST: register user
app.post('/register', validRegister, RegisterUser);

//? POST: encode endpoint
app.post('/encode', validLogin, EncodeData);

//? POST: decode endpoint
app.post('/decode', validToken, DecodeData);

//? POST: image profile update
app.post('/imageProfile', validImgProfile, ImageProfile);

//? POST: create place
app.post('/place', validPlace, RegisterPlace);

//? POST: create visit
app.post('/visit', validVisit, RegisterVisit);

//? GET: get all users who visit a place
app.get('/visit/place/:place_id', GetUsersPlace);

//? GET: get all the places one user visit
app.get('/visit/user/:user_id', GetPlacesUser);

// Visit.findAll({
//     where: { id_user: 1, id_place: 2 },
// });

//* Listening app
app.listen(port, () => {
    console.log('its working on port: ' + port);
});