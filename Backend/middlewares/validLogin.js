const validLogin = (req, res, next) => {
    const regexs = {
        email: /^[a-zA-Z0-9.]+@{1}[a-zA-Z0-9.]+$/,
        password: /.{8,}/,
    };

    const { body } = req;

    if (Object.keys(body).length > Object.keys(regexs).length) {
        return res.status(400).json({msg: 'Se enviaron campos demas'});
    }

    for (let value in regexs) {
        if (!body[value]) {
            return res.status(400).json({ msg: `Es requerido el campo ${value}` });
        }

        if (!regexs[value].test(body[value])) {
            return res.status(400).json({ msg: `El campo ${value} esta erroneo` });
        }
    }

    next();
}

module.exports = {
    validLogin
}