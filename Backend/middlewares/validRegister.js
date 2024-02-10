const useCapitalize = require("../helpers/useCapitalize");

const validRegister = (req, res, next) => {
    const regexs = {
        name: /^[a-zA-Z\s]+$/,
        lastname: /^[a-zA-Z\s]+$/,
        phone: /^[0-9]{10}$/,
        email: /^[a-zA-Z0-9.]+@{1}[a-zA-Z0-9.]+$/,
        password: /.{8,}/,
    };

    const { body, method } = req;

    if (Object.keys(body).length > Object.keys(regexs).length) {
        return res.status(400).json({msg: 'Se enviaron campos demas'});
    }

    for (let value in regexs) {
        if (!body[value] && method !== 'PUT') {
            return res.status(400).json({ msg: `Es requerido el campo ${value}` });
        }

        if (!regexs[value].test(body[value])) {
            return res.status(400).json({ msg: `El campo ${value} esta erroneo` });
        }

        if (value === 'name' || value === 'lastname') {
            let newText = body[value].split(' ')[0];
            body[value] = useCapitalize(newText);
        }
    }

    next();
}

module.exports = {
    validRegister
}