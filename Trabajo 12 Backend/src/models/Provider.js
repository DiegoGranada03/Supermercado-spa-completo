const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Provider = sequelize.define("Provider", {
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  city: DataTypes.STRING,
});

module.exports = Provider;