const express = require("express");
var cors = require("cors");

const property = require("../routes/property");
const user = require("../routes/user");
const buyer = require("../routes/buyer");

module.exports = function(app) {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    /*res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Accept, X-Requested-With, x-auth-token"
    );*/
    next();
  });
  app.use(express.json());
  app.use("/property", property);
  app.use("/user", user);
  app.use("/buyer", buyer);
};
