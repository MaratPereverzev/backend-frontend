const { DataTypes } = require("sequelize");

module.exports = (db, defOptions) => {
  const model = db.define(
    "store",
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    defOptions
  );

  return model;
};
