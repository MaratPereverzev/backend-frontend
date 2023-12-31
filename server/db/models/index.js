require("module-alias/register");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("@config/config.json")["db"];
const { walkDir } = require("@utils/file");
const { ErrorLoaderFile } = require("@utils/class");
const db = {};

const capitalizeFirstLetterWithoutIndex = (str) => {
  if (str === "index") {
    return "";
  }
  return str[0].toUpperCase() + str.slice(1);
};
//define a default options for models
const defOptions = {
  paranoid: true,
};

//define a sequelize config
let sequelize;

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//find all models in /models directory
const findFile = [];

walkDir(__dirname, (dir, files) => {
  files
    .filter((item) => {
      //filter models & add them to findFile array
      return (
        (item !== basename || dir.replace(__dirname, "") !== "") &&
        item.slice(-3) === ".js"
      );
    })
    .forEach((item) => findFile.push(path.join(dir, item)));
});

//create names for models & load models
const loaderFile = [];

findFile.forEach((item) => {
  const extension = path.extname(item);
  const file = path.basename(item, extension);
  /*chech wether the file in /modles folder directry
    if it is - creates a name for a model that consists of the file name
    if it's not - creates a name for a model that consists of the subfolders names and corresponding file name */
  const modelName =
    path.dirname(item.replace(__dirname + path.sep, "")) !== "."
      ? path
          .dirname(item.replace(__dirname + path.sep, ""))
          .split(path.sep)
          .map((dir, index) =>
            index === 0 ? dir : capitalizeFirstLetterWithoutIndex(dir)
          )
          .join("") + capitalizeFirstLetterWithoutIndex(file)
      : file;
  const model = require(item);

  if (typeof model === "function") {
    const loadModel = model(sequelize, defOptions, modelName);

    if (loadModel) {
      loaderFile.push(
        modelName === loadModel.name
          ? modelName
          : `${modelName} (${loadModel.name})`
      );
      db[loadModel.name] = loadModel;
    } else {
      throw ErrorLoaderFile;
    }
  }
});

//associate all the models between each others if they have these associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//logging
if (typeof console.logUserDone === "function") {
  console.logUserDone("SYSTEM", `DB-models: \n ${loaderFile.join(", ")}`);
} else {
  console.log("SYSTEM", `DB-models: \n ${loaderFile.join(", ")}`);
}

module.exports = db;
