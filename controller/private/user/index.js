const { Op } = require("sequelize");
const models = require("../../../db/models");
const { checkVal } = require("../../../utils");

const getURI = (req, res) => {
  const { id } = req.params;
  models.user
    .findOne({ where: { id } })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
  return;
};

const get = (req, res) => {
  const { search, limit, offset } = req.query;
  const where = search ? { caption: { [Op.getLike()]: `%${search}%` } } : null;
  models.user
    .findAndCountAll({
      where,
      ...(limit ? { limit } : {}),
      ...(offset ? { offset } : {}),
    })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
};

const update = (req, res) => {
  const { id, ...other } = req.body;
  models.user
    .update(other, { where: { id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getURI);
  router.put("/", checkVal(["id"], "body"), update);

  return router;
  /*
  router.post("/", post);
  router.delete("/", del);
  */
};
