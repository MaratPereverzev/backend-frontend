const jwt = require("jsonwebtoken");
const config = require("@config/config.json");
const password = config.jwt ?? "123";
const models = require("@models");
const { HasMany } = require("sequelize");

const jwtCreate = (data, password) =>
  jwt.sign(data, password, { noTimestamp: true });

const jwtVal = (token) =>
  jwt.verify(token, password, (err, data) => {
    if (err) {
      return false;
    }
    return data;
  });

const jwtMiddleware = async (req, res, next) => {
  const { authorization: authorizationProps } = req.headers;

  const authorization = authorizationProps?.replaceAll("JWT ", "");

  if (!authorization || !jwtVal(authorization)) {
    res.status(401).send("user not found");
    return;
  }

  req.userData = await models.user.findOne({
    include: [
      {
        association: new HasMany(models.user, models.userRole, {
          sourcekey: "id",
          foreignKey: "userId",
        }),
      },
    ],
    where: { id: jwtVal(authorization)?.id },
  });

  if (req.userData?.isAdmin || req.userData?.isSuperAdmin) {
    next();
    return;
  }

  const findAccess = req.userData?.userRoles?.find(
    (item) => item.controller === req.baseUrl.replaceAll("/", "")
  );

  if (findAccess) {
    req.userData = jwtVal(authorization);
    next();
    return;
  }

  res.status(401).send({
    error: `user '${req.userData?.caption}' doesn't have access to ${req.baseUrl}`,
  });
};

module.exports = { jwtCreate, jwtVal, jwtMiddleware };
