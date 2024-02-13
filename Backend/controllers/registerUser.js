const bcrypt = require('bcrypt');
const db = require('../config/instance');
const User = require('../config/models/user')(db);
const useValidPass = require('../helpers/useValidPass');
const useId = require('../helpers/useId');

const RegisterUser = async (req, res) => {
    const { body } = req;

    const uniqueID = useId();

    try {
        const user = await User.findOne({
            where: { email: body.email },
            raw: true,
        });

        if (user && useValidPass(body.password, user.password)) {
            return res.status(400).json({ msg: 'el usuario ya existe' });
        }

        body['password'] = bcrypt.hashSync(body.password, 10);

        await User.create({ id: uniqueID, ...body });;

        res.status(200).json({ msg: 'se agrego correctamente el usuario' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

module.exports = {
    RegisterUser
};