const { Op, HasMany } = require("sequelize");
const models = require("./db/models");
const express = require("express");

const app = express();

const router = express.Router();

app.use(express.json());

router.get("/", (req, res) => {
  const { search } = req.query;

  models.user
    .findAll(
      search
        ? {
            logging: console.log,
            where: {
              caption: { [Op.iLike]: search },
            },
          }
        : {}
    )
    .then((data) => res.send(data.map((row) => row.toJSON())))
    .catch((err) => {
      res.status(500).send(err);
    });
});
router.post("/", (req, res) => {
  models.user
    .create(req.body)
    .then((data) => {
      res.send(data.toJSON());
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
/*
models.user
  .findAll({ logging: null })
  .then((data) => data.forEach((item) => console.log(item.toJSON())));

models.good
  .findAll()
  .then((data) => data.forEach((item) => console.log(item.toJSON())));
*/
//models.good.create({ caption: "sausage", description: "test" });

app.use("/user", router);

app.listen(8080, () => {
  console.log("a server is listening on port: 8080");
});

models.store
  .findAll({
    include: [
      {
        association: new HasMany(models.store, models.storeSetting, {
          sourceKey: "id",
          foreignKey: "storeId",
        }),
      },
    ],
  })
  .then((data) => {
    console.log(data);
  });
