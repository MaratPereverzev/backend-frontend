require("module-alias/register");
const { app } = require("@config");
require("@events");

const initLoad = require("@controller");
const wsServer = require("./wsServer");

if (typeof wsServer === "function") {
  wsServer(app);
}

if (typeof initLoad === "function") {
  initLoad(app);
}

app.listen(8080, () => {
  console.log("a server is listening on port: 8080");
});

//models.good.create({ caption: "test", count: 10, price: 2.5 });
/*
models.good
  .findOne({ where: { caption: "test" } })
  .then((data) => console.log(data.full));
*/
/*
models.media.findAll().then((data) => {
  data.forEach((item) => console.log(item.toJSON()));
});
*/
/*
models.userRole.findAll().then((data) => {
  data.forEach((item) => console.log(item.toJSON()));
});
*/
/*
models.userRole.create({
  caption: "auto create",
  controller: "good",
  userId: 1,
});
*/
//models.user.create({ login: "marat", password: "123321" });
//console.log(jwtCreate({ id: 1, login: "marat", password: "123321" }, "123"));
