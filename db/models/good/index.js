const { DataTypes } = require("sequelize");

module.exports = (db, defOptions) => {
  const model = db.define(
    "good",
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    defOptions
  );

  return model;
};
