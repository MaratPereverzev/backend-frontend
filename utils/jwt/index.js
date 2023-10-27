const jwt = require("jsonwebtoken");
const config = require("@config/config.json");
const password = config.jwt ?? "123";

const jwtCreate = (data, password) =>
  jwt.sign(data, password, { noTimestamp: true });

const jwtVal = (token) =>
  jwt.verify(token, password, (err, data) => {
    if (err) {
      return false;
    }
    return data;
  });

const jwtMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !jwtVal(authorization)) {
    res.status(401).send("user not found");
    return;
  }

  req.userData = jwtVal(authorization);
  next();
};

module.exports = { jwtCreate, jwtVal, jwtMiddleware };
