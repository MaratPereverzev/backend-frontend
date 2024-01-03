const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use((req, res, next) => {
  res.setHeader("X-server", process.setting.version);
  next();
});

module.exports = { app };
