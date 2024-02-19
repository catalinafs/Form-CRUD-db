const validPlace = (req, res, next) => {
    const regexs = {
        token: /.*/s,
        placeToVisit: /^[a-zA-Z\s]+$/,
    };

    const { body, method } = req;

    if (Object.keys(body).length > Object.keys(regexs).length) {
        return res.status(400).json({ msg: 'Se enviaron campos demas' });
    }

    for (let value in regexs) {
        if (!body[value] && method !== 'PUT') {
            return res.status(400).json({ msg: `Es requerido el campo ${value}` });
        }

        if (!regexs[value].test(body[value])) {
            return res.status(400).json({ msg: `El campo ${value} esta erroneo` });
        }
    }

    next();
}

module.exports = validPlace;