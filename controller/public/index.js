const path = require("path");
const basename = path.basename(__filename);
const { Router } = require("express");
const { capitalizeFirstLetterWithoutIndex, jwtMiddleware } = require("@utils");
const { routerCheck } = require("@utils");
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
    //router.use(jwtMiddleware);
    const loadController = controller(router, controllerName);

    if (loadController) {
      const checkResult = routerCheck(router, ["put", "post", "delete"]);

      if (checkResult.length > 0) {
        console.log(
          `⚠️  there are danger methods, such as \x1b[31m"${checkResult.join(
            ", "
          )}"\x1b[0m in \x1b[31m${controllerName.toUpperCase()}\x1b[0m PUBLIC controller ⚠️`
        );
      }
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
    `Controllers PUBLIC: \n ${loaderFile.join(", ")}`
  );
} else {
  console.log("SYSTEM", `Controllers PUBLIC: \n ${loaderFile.join(", ")}`);
}

process.controllers.public = loaderFile;

module.exports = controllers;
