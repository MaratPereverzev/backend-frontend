const private = require("./private");
const public = require("./public");

const { loader: moduleRename } = require("../utils");
module.exports = moduleRename("controller", { public, private });
