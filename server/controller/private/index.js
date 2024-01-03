const path = require("path");
const basename = path.basename(__filename);
const { Router } = require("express");
const { capitalizeFirstLetterWithoutIndex, jwtMiddleware } = require("@utils");
const { walkDir } = require("@utils/file");

const controllers = [];
const findFile = [];

//find all models in /models directory
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
  const controllerName =
    path.dirname(item.replace(__dirname + path.sep, "")) !== "."
      ? path
          .dirname(item.replace(__dirname + path.sep, ""))
          .split(path.sep)
          .map((dir, index) =>
            index === 0 ? dir : capitalizeFirstLetterWithoutIndex(dir)
          )
          .join("") + capitalizeFirstLetterWithoutIndex(file)
      : file;
  const controller = require(item);

  if (typeof controller === "function") {
    const router = Router();
    router.use(jwtMiddleware);
    const loadController = controller(router, controllerName);

    if (loadController) {
      loaderFile.push(
        controllerName === loadController.name
          ? controllerName
          : `${controllerName}`
      );
      controllers.push({ name: `/${controllerName}`, router: loadController });
    }
  }
});

//logging
if (typeof console.logUserDone === "function") {
  console.logUserDone(
    "SYSTEM",
    `Controllers PRIVATE: \n ${loaderFile.join(", ")}`
  );
} else {
  console.log("SYSTEM", `Controllers PRIVATE: \n ${loaderFile.join(", ")}`);
}

process.controllers = {};
process.controllers.private = loaderFile;

module.exports = { path: "/api/private", controllers };
