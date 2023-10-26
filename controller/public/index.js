const path = require("path");
const basename = path.basename(__filename);
const file = require("file");
const { Router } = require("express");
const { capitalizeFirstLetterWithoutIndex } = require("@utils");

const controllers = [];
const findFile = [];

//find all models in /models directory
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
    const router = Router();
    const loadModel = model(router, modelName);

    if (loadModel) {
      loaderFile.push(
        modelName === loadModel.name ? modelName : `${modelName}`
      );
      controllers.push({ name: `/${modelName}`, router: loadModel });
    }
  }
});

//logging
if (typeof console.logUserDone === "function") {
  console.logUserDone(
    "SYSTEM",
    `Controllers PUBLIC: \n ${loaderFile.join(", ")}`
  );
} else {
  console.log("SYSTEM", `Controllers PUBLIC: \n ${loaderFile.join(", ")}`);
}

module.exports = controllers;
