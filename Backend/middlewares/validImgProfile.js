const validImgProfile = (req, res, next) => {
    const { body } = req;

    if (Object.keys(body).length > 1) {
        return res.status(400).json({ msg: 'Se enviaron campos demas' });
    }

    if (typeof body.image !== 'string') {
        return res.status(400).json({ msg: `El tipo de dato ${typeof body.image} no coincide con el del campo image.` });
    }

    next();
}

module.exports = validImgProfile;