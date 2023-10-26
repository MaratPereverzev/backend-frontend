require("module-alias/register");
require("@config");
require("@events");
const express = require("express");
const controllers = require("@controller");
const app = express();
const { jwtCreate } = require("@utils");

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
console.log(
  jwtCreate({ id: 5, caption: "marat", description: "qwerty" }, "123")
);

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiY2FwdGlvbiI6Im1hcmF0In0.p-v_fZf3NqIGmdg2SvlA9_lW8Pb6BxP9kbTqAL2k0jU
 */
