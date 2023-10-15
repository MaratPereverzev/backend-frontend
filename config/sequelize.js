const { Op } = require("sequelize");
const configDB = require("./config.json");

Op.getLike = function () {
  if (configDB.development.dialect === "postgress") {
    return this.iLike;
  }
  return this.like;
};
