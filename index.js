const express = require("express");
const config = require("config");
const app = express();

require("./startup/db")();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Yogy");
});
const server = app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});
