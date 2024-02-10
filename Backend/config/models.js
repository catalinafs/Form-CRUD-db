const { DataTypes } = require("sequelize");
const db = require("./instance");

const User = db.define('user', {
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    imageProfile: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        updatedAt: false,
        createdAt: false,
    }
);

module.exports = {
    User,
};