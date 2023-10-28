const { DataTypes } = require("sequelize");

module.exports = (db, defOptions) => {
  const model = db.define(
    "storeSetting",
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    defOptions
  );

  model.associate = (models) => {
    model.belongsTo(models.store, {
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    });
  };
  return model;
};
