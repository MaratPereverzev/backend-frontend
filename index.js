require("module-alias/register");
require("@config");
require("@events");
const express = require("express");
const controllers = require("@controller");
const app = express();
const wsServer = require("./wsServer");
const models = require("@models");

app.use(express.json());

if (typeof wsServer === "function") {
  wsServer(app);
}

Object.keys(controllers).forEach((key) => {
  if (Array.isArray(controllers[key])) {
    controllers[key].forEach((item) => {
      if (item.name && item.router) {
        app.use(item.name, item.router);
      }
    });
  }
});

app.listen(8080, () => {
  console.log("a server is listening on port: 8080");
});

/*
models.userRole.create({
  caption: "auto create",
  controller: "user",
  userId: 5,
});
*/
//models.user.create({ login: "marat", password: "123321" });