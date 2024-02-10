const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const pathfile = './info.json';

let info;

fs.readFile(pathfile, 'utf8', (err, data) => {
    if (err) console.log('❗Error al leer el archivo: ', err);

    console.log(JSON.parse(data))
    info = JSON.parse(data);
});

const EncodeData = (req, res) => {
    const { email, password } = req.body;

    const userData = info.find((user) => { return user.email === email && bcrypt.compareSync(password, user.password) });

    console.log(userData)
    if (!userData || userData === undefined) res.status(404).json({ msg: 'Usuario no encontrado' });

    const encode = jwt.sign(userData, process.env.SECRET_KEY);

    res.status(200).json({ token: encode });
}

module.exports = {
    EncodeData
};