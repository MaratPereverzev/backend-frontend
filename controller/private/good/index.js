const { Op } = require("sequelize");
const models = require("@models");
const { checkVal, defAnswer } = require("@utils");
const { getMediaPath } = require("@utils");

const getURI = (req, res) => {
  const { id } = req.params;
  models.user.findOne({ where: { id } }).defAnswer(res);
  return;
};

const get = (req, res) => {
  const { search, limit, offset } = req.query;

  process.myEvents?.emit("new order", req.userData);

  const where = search ? { caption: { [Op.getLike()]: `%${search}%` } } : null;
  models.user
    .findAndCountAll({
      where,
      ...(limit ? { limit } : {}),
      ...(offset ? { offset } : {}),
    })
    .then(async (data) => {
      const userRoleData = await models.userRole.findAll({
        where: { userId: data.rows.map((item) => item.id) },
      });

      const result = {
        count: data.count,
        rows: data.rows.map((item) => {
          return {
            ...item.toJSON(),
            userRoles: userRoleData.find((role) => role.userId === item.id),
          };
        }),
      };
      return result;
    })
    .defAnswer(res, 401, { msg: "Auth Error" });
};

const update = (req, res) => {
  const { id, ...other } = req.body;
  models.user.update(other, { where: { id } }).defAnswer(res);
};

const post = (req, res) => {
  const files = Object.keys(req.files);

  for (const file of files) {
    const item = req.files[file];

    const mediaPath = getMediaPath(
      item.mimetype ? item.mimetype.split("/")[0] : null
    );

    item.mv(`${mediaPath}${item.md5}`);
  }
};
module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getURI);
  router.put("/", checkVal(["id"], "body"), update);
  router.post("/", post);

  return router;
  /*
  router.delete("/", del);
  */
};
