const jwt = require('jsonwebtoken');
const useValidPass = require('../helpers/useValidPass');
const User = require('../db/models/user');

const EncodeData = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email: email,
            },
            raw: true,
        });

        if (!user) {
            return res.status(400).json({ msg: 'Usuario no registrado' });
        }

        if (!useValidPass(password, user.password)) {
            return res.status(400).json({ msg: 'Usuario no registrado' });
        }

        const encode = jwt.sign(user, process.env.SECRET_KEY);

        res.status(200).json({
            msg: 'Token creado exitosamente',
            token: encode
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

module.exports = EncodeData;