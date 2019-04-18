const express = require("express");
//const config = require("config");
const app = express();

const port = process.env.PORT;
console.log(process.env.env, app.get("env"));
const server = app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});
