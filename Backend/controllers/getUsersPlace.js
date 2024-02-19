const Place = require("../db/models/place");
const User = require("../db/models/user");
const Visit = require("../db/models/visit");

const GetUsersPlace = async (req, res) => {
    const { params } = req;

    try {
        const allVisits = await Visit.findAll({
            where: { id_place: params.place_id },
            include: [{ model: User, as: 'user-visit', attributes: { exclude: ['password'] } }],
        });

        if (!allVisits) {
            return res.status(400).json({ msg: 'El lugar no ha sido visitado' });
        }

        res.status(200).json({ msg: allVisits });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
}

module.exports = GetUsersPlace;