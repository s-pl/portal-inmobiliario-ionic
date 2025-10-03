const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); 

const Property = sequelize.define('Property', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    propertyType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    transactionType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    images: {
        type: DataTypes.STRING, 
        allowNull: true,
    },
    contactPhone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Property;