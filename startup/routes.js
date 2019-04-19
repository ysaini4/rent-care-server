const express = require("express");
var cors = require("cors");

const property = require("../routes/property");
module.exports = function(app) {
  app.use(cors());
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Accept, X-Requested-With, auth"
    );
    next();
  });
  app.use(express.json());
  app.use("/property", property);
};
