const bcrypt = require('bcrypt');

const useValidPass = (passUser, passDB) => {
    return bcrypt.compareSync(passUser, passDB);
}

module.exports = useValidPass;