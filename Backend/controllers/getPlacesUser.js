const Place = require("../db/models/place");
const Visit = require("../db/models/visit");

const GetPlacesUser = async (req, res) => {
    const { params } = req;

    try {
        const allPlaces = await Visit.findAll({
            where: { id_user: params.user_id },
            include: [{ model: Place, as: 'place-visit' }],
        });

        if (!allPlaces || allPlaces.length === 0) {
            return res.status(400).json({ msg: 'El usuario no ha visitado ningun lugar' });
        }

        res.status(200).json({ msg: allPlaces });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
}

module.exports = GetPlacesUser;