const models = require("@models");
const { getMediaPath, checkVal } = require("@utils");
const fs = require("fs");

const name = "media";

const post = (req, res) => {
  const files = Object.keys(req.files);

  for (const file of files) {
    const item = req.files[file];

    const mediaData = models.media
      .create({
        name: item.name,
        size: item.size,
        mimeType: item.mimeType,
        fileId: item.md5,
      })
      .defAnswer(res);

    item.mv(`${getMediaPath()}${item.md5}`);
  }
};

module.exports = (router, moduleName) => {
  router.post("/", post);

  return router;
};
