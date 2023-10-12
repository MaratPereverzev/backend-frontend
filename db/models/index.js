const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const file = require("file");
const config = require(__dirname + "/../../config/config.json")["development"];
const db = {};

//define a default options for models
const defOptions = {
  paranoid: true,
};

//define a sequelize config
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

//return first-capitalized words for making names for models
function capitalizeFirstLetterWithoutIndex(string) {
  if (string === "index") {
    return "";
  }
  return string[0].toUpperCase() + string.slice(1);
}

//find all models in /models directory
const findFile = [];

file.walkSync(__dirname, (dir, dirs, files) => {
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
