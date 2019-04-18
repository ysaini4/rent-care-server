const mongoose = require("mongoose");
const config = require("config");
module.exports = function() {
  const db = config.get("db");
  console.log(process.env.db, "vv");
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to db", db);
    })
    .catch(err => {
      console.log("Not connected to db", err);
    });
};
