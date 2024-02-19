const useId = require("../helpers/useId");
const jwt = require("jsonwebtoken");
const User = require("../db/models/user");
const Place = require("../db/models/place");
const Visit = require("../db/models/visit");

const RegisterVisit = async (req, res) => {
    const { body } = req;

    const uniqueID = useId();

    try {
        const decode = jwt.verify(body.token, process.env.SECRET_KEY);

        const user = await User.findOne({
            where: {
                email: decode.email,
            },
            raw: true,
        });

        if (!user) {
            return res.status(400).json({ msg: 'el usuario no existe' });
        }

        if (user.id !== decode.id) {
            return res.status(400).json({ msg: 'el usuario no existe' });
        }

        const place = await Place.findOne({
            where: {
                name: body.placeToVisit,
            },
            raw: true,
        });

        if (!place) {
            return res.status(400).json({ msg: 'el lugar no existe' });
        }

        await Visit.create({
            id: uniqueID,
            id_user: user.id,
            id_place: place.id,
        });

        res.status(200).json({ msg: decode });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
}

module.exports = RegisterVisit;