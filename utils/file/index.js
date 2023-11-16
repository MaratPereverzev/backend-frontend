const fs = require("fs");
const path = require("path");

const readDir = (dirPath, callback) => {
  const elements = fs.readdirSync(dirPath, { withFileTypes: true });
  const listDir = elements.filter((item) => item.isDirectory());
  const listFiles = elements.filter((item) => !item.isDirectory());

  callback(
    dirPath,
    listFiles.map((item) => item.name)
  );

  listDir.forEach((dir) => {
    readDir(path.resolve(dirPath, dir.name), callback);
  });
};

const walkDir = (dirPath, callback) => {
  if (!dirPath || !(typeof callback === "function")) {
    return;
  }
  readDir(dirPath, callback);
};

module.exports = { walkDir };
