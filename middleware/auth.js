const jwt = require("jsonwebtoken");
const config = require("config");

exports.auth = function(req, res, next) {
  checkAuth(req, res);
  next();
};

exports.adminAuth = function(req, res, next) {
  try {
    checkAuth(req, res);
    if (req.user && req.user.userType !== "admin")
      return res.status(401).send("Unauthorized user.");
    next();
  } catch (ex) {
    res.status(401).send("Unauthorized user.");
  }
};
const checkAuth = (req, res) => {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
