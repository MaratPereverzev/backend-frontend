const { ErrorMiddleWare } = require("@class");

const checkVal = (fields, place) => {
  if (!Array.isArray(fields)) {
    throw new ErrorMiddleWare("fields parameter is not an array");
  }
  return (req, res, next) => {
    const checkData = req[place] ? req[place] : {};
    const checkArr = fields.filter((item) => !checkData[item]);

    if (checkArr.length === 0) {
      next();
      return;
    }

    res.status(500).send({
      error: true,
      message: `Not enough fields of "${fields.join(", ")}" in "${place}"`,
    });
  };
};
module.exports = { checkVal };
