const fs = require('fs');
const jwt = require('jsonwebtoken');

const pathfile = './info.json';

let info;

fs.readFile(pathfile, 'utf8', (err, data) => {
    if (err) console.log('❗Error al leer el archivo: ', err);

    info = JSON.parse(data);
});

const DecodeData = (req, res) => {
    const { token } = req.body;

    const decode = jwt.verify(token, process.env.SECRET_KEY)

    const userData = info.find((user) => { return user.email === decode.email && user.id === decode.id });

    if (!userData || userData === undefined) res.status(401).json({ msg: 'Token erroneo' });

    delete userData.password;

    res.status(200).json({ user: userData });
}

module.exports = {
    DecodeData
};