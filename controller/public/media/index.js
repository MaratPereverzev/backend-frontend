const models = require("@models");
const { getMediaPath, checkVal } = require("@utils");
const fs = require("fs");
const zlib = require("zlib");

const get = async (req, res) => {
  const { fileId } = req.query;

  if (fs.existsSync(getMediaPath() + fileId)) {
    const fileData = await models.media.findOne({ where: { fileId } });

    if (fileData) {
      const header = {
        "Cache-control": "no-transform, public, max-age=3600",
        expires: "3h",
        "content-type": fileData.mimeType,
        "accept-ranges": "bytes",
        "content-length": fileData.size,
        "Content-Range": `bytes 0-*/${fileData.size}`,
      };

      console.log(header);
      const file = fs.createReadStream(`${getMediaPath()}${fileId}`);

      if (req.acceptsEncodings("deflate") === "deflate") {
        res.writeHead(200, { ...header, "Content-Encoding": "deflate" });
        console.log(res);
        file.pipe(zlib.createDeflate()).pipe(res);
      } else if (req.acceptsEncodings("gzip") === "gzip") {
        res.writeHead(200, { ...header, "Content-Encoding": "gzip" });
        file.pipe(zlib.createGzip()).pipe(res);
      } else {
        res.writeHead(200, header);
        file.pipe(res);
      }
      return;
    } else {
      res.status(404).send("media isn't found");
    }
  } else {
    res.status(404).send("media isn't found");
  }
};

module.exports = (router, moduleName) => {
  router.get("/", checkVal(["fileId"], "query"), get);
  return router;
};
