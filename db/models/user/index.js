const { DataTypes } = require("sequelize");

module.exports = (db) => {
  const model = db.define(
    "user",
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
      login: DataTypes.TEXT,
      password: DataTypes.TEXT,
    },
    {
      paranoid: true,
    }
  );
  return model;
};
