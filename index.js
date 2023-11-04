require("module-alias/register");
require("@config");
require("@events");
const express = require("express");
const controllers = require("@controller");
const wsServer = require("./wsServer");
const fileUpload = require("express-fileupload");
const models = require("@models");

const app = express();

if (typeof wsServer === "function") {
  wsServer(app);
}

app.use(express.json());
app.use(fileUpload());

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
models.userRole.findAll().then((data) => {
  data.forEach((item) => console.log(item.toJSON()));
});
*/
/*
models.userRole.create({
  caption: "auto create",
  controller: "good",
  userId: 5,
});
*/
//models.user.create({ login: "marat", password: "123321" });
