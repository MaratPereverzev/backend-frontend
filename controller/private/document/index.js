const { Op } = require("sequelize");
const models = require("@models");
const { checkVal, defAnswer } = require("@utils");
const { getMediaPath } = require("@utils");
const XLSX = require("xlsx");

const get = (req, res) => {
  const { fileId, search, limit, offset } = req.query;

  if (fileId) {
    models.document
      .findOne({
        include: [{ model: models.media, as: "media" }],
        where: { fileId },
      })
      .then((data) => {
        if (data) {
          const { media } = data.toJSON();
          const { fileId } = media;

          const workbook = XLSX.read(`${getMediaPath()}${fileId}`, {
            type: "file",
          });
          const sheets = workbook.SheetNames;
          const jsonData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheets[0]],
            { header: "A" }
          );
          return { ...data.toJSON(), excelData: jsonData };
        }
      })
      .defAnswer(res);
    return;
  }

  const where = search ? { caption: { [Op.getLike()]: `%${search}%` } } : null;
  models.document
    .findAndCountAll({
      where,
      ...(limit ? { limit } : {}),
      ...(offset ? { offset } : {}),
    })
    .then(async (data) => {
      const mediaColumns = await models.media.findAll({
        where: { id: data.rows.map((document) => document.mediaId) },
      });
      const result = {
        count: data.count,
        rows: data.rows.map((item) => {
          return {
            ...item.toJSON(),
            media: mediaColumns.find((media) => media.id === item.mediaId),
          };
        }),
      };
      return result;
    })
    .defAnswer(res, 401, { msg: "Auth Error" });
};

const post = async (req, res) => {
  const { caption, description } = req.body;
  if (req.files.document) {
    const item = req.files.document;

    const mediaData = models.media
      .create({
        name: item.name,
        size: item.size,
        mimeType: item.mimetype,
        fileId: item.md5,
      })
      .then((media) => {
        const documentData = models.document.create({
          caption,
          description,
          mediaId: media?.id,
        });
        item.mv(`${getMediaPath()}${item.md5}`);
        return documentData;
      })
      .defAnswer(res);
    return;
  }
  res.status(500).send({ error: "file wasn't found" });
};

module.exports = (router) => {
  router.get("/", get);
  router.post("/", post);

  return router;
};
