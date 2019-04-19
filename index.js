const express = require("express");
const app = express();

require("./startup/db")();
require("./startup/cloudnary")();
require("./startup/routes")(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});
