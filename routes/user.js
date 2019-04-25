const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(403).send("Invalid username and password");
  }
  const validateuser = await bcrypt.compare(req.body.password, user.password);
  if (!validateuser)
    return res.status(400).send("Invalid username and password.");
  const token = user.generateAuthToken();

  res.send({ token });
});

router.post("/", async (req, res) => {
  try {
    let user = new User(
      _.pick(req.body, ["name", "email", "password", "userType"])
    );
    console.log(user);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await user.save();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});
module.exports = router;
