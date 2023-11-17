const { DataTypes } = require("sequelize");

module.exports = (db, defOptions, modelName) => {
  const model = db.define(
    modelName,
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
      addonSetting: {
        type: DataTypes.TEXT,
        get() {
          const rowValue = this.getDataValue("addonSetting");
          let result = null;

          if (rowValue) {
            try {
              result = JSON.parse(rowValue);
            } catch {
              console.err(`JSON for "addonSetting" isn't valid`, err);
              result = null;
            }
            return result;
          }
        },
        set(value) {
          this.setDataValue("addonSetting", JSON.stringify(value));
        },
      },
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
