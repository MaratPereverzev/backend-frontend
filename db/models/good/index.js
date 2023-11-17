const { DataTypes } = require("sequelize");

module.exports = (db, defOptions, modelName) => {
  const model = db.define(
    modelName,
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
      count: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      full: {
        type: DataTypes.VIRTUAL,
        get() {
          const count = this.getDataValue("count");
          const price = this.getDataValue("price");
          return count * price;
        },
      },
    },
    defOptions
  );

  return model;
};
