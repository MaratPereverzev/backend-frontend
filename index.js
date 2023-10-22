require("./config");
const express = require("express");
const controllers = require("./controller");
const { jwtCreate, jwtVal } = require("./utils");

const app = express();

app.use(express.json());

Object.keys(controllers).forEach((key) => {
  if (Array.isArray(controllers[key])) {
    controllers[key].forEach((item) => {
      if (item.name && item.router) {
        app.use(item.name, item.router);
      }
    });
  }
});

/*
if (Array.isArray(controllers.public)) {
  controllers.public.forEach((item) => {
    if (item.name && item.router) {
      app.use(item.name, item.router);
    }
  });
}

if (Array.isArray(controllers.private)) {
  controllers.private.forEach((item) => {
    if (item.name && item.router) {
      app.use(item.name, item.router);
    }
  });
}
*/

app.listen(8080, () => {
  console.log("a server is listening on port: 8080");
});

/*
 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NX0.LcsSrAyx2o5oQF8veOhzvBhhz9MfTASxF_Hatx2qUSk
 */
