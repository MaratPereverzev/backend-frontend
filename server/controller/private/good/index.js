const { Op } = require("sequelize");
const models = require("@models");
const { checkVal, defAnswer } = require("@utils");
const { getMediaPath } = require("@utils");

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
      .then((media) => {
        models.document.create({ caption, description, mediaId: media?.id });
        return;
      })
      .catch((err) => {
        console.log("ERROR CREATE MODEL DATA", err);
      });

    item.mv(`${getMediaPath()}${item.md5}`);
  }
};
module.exports = (router) => {
  router.post("/", post);

  return router;
  /*
  router.delete("/", del);
  */
};
