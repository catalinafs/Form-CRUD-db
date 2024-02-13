const jwt = require('jsonwebtoken');
const db = require('../config/instance');
const User = require('../config/models/user')(db);

const DecodeData = async (req, res) => {
    const { token } = req.body;

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({
            where: {
                email: decode.email,
            },
            raw: true,
        });

        if (!user) {
            return res.status(400).json({ msg: 'Token erroneo' });
        }

        if (decode.id !== user.id) {
            return res.status(400).json({ msg: 'Token erroneo' });
        }

        let userData = { ...user };

        delete userData.password;

        res.status(200).json({ user: userData });
    } catch (err) {
        res.status(400).json({ user: err.message });
    }
}

module.exports = {
    DecodeData
};