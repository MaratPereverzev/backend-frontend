const models = require("./db/models");

models.user
  .findAll()
  .then((data) => data.forEach((item) => console.log(item.toJSON())));
//models.user.create({ caption: "test", description: "test" });
