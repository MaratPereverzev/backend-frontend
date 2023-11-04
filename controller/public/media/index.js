const models = require("@models");
const { getMediaPath, checkVal } = require("@utils");
const fs = require("fs");

const name = "media";

const get = async (req, res) => {
  const { fileId } = req.query;

  if (fs.existsSync(getMediaPath() + fileId)) {
    const file = fs.createReadStream(getMediaPath() + fileId);

    file.pipe(res);
  } else {
    res.status(404).send("media isn't found");
  }
};

module.exports = (router, moduleName) => {
  router.get("/", checkVal(["fileId"], "query"), get);

  return router;
};
