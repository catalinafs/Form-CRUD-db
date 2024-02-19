const Place = require("../db/models/place");
const useId = require("../helpers/useId");

const RegisterPlace = async (req, res) => {
    const { body } = req;

    const uniqueId = useId();

    try {
        const place = await Place.findOne({
            where: {
                name: body.name,
            },
            raw: true,
        });

        if (place) {
            return res.status(400).json({ msg: 'El lugar ya existe' });
        }

        await Place.create({ id: uniqueId, ...body });

        res.status(200).json({ msg: 'Lugar agregado' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

module.exports = RegisterPlace;