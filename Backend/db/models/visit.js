const db = require("../instance");
const User = require("../models/user");
const Place = require("./place");
const { DataTypes } = require("sequelize");

const Visit = db.define('visit', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_place: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
    {
        updatedAt: false,
        freezeTableName: true,
    }
);

Visit.belongsTo(User, {
    foreignKey: 'id_user',
    as: 'user-visit',
    onDelete: 'CASCADE',
});

User.hasMany(Visit, {
    foreignKey: 'id_user',
    as: 'visit-user',
});

Visit.belongsTo(Place, {
    foreignKey: 'id_place',
    as: 'place-visit',
    onDelete: 'CASCADE',
});

Place.hasMany(Visit, {
    foreignKey: 'id_place',
    as: 'visit-place',
});

module.exports = Visit;