const models = require("@models");
const password = require("@config/config.json").jwt;
const { jwtCreate } = require("@utils");

const name = "user";
const model = models[name];

const get = (req, res) => {
  const { login, password } = req.query;
  model
    .findOne({ where: { login, password } })
    .then((data) => {
      if (data) {
        return {
          isAuth: true,
          accessToken: jwtCreate({ id: data.id }, password),
          userCaption: data?.login,
          title: process.setting.title,
          version: process.setting.version,
        };
      }
      throw new Error("AuthError");
    })
    .defAnswer(res, { msg: "Auth Error" });
};

module.exports = (router, moduleName) => {
  router.get("/", get);

  return router;
};
