const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(fileUpload());

module.exports = { app };
