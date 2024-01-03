const fs = require("fs");

const getMediaPath = () => {
  if (!fs.existsSync("./media")) {
    fs.mkdirSync("./media");
  }

  return "./media/";
};

module.exports = { getMediaPath };
