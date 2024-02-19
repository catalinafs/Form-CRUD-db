const { DataTypes } = require("sequelize");
const db = require("../instance");

const Place = db.define('place', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    placeType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        updatedAt: false,
        createdAt: false,
        freezeTableName: true,
    }
);

module.exports = Place;