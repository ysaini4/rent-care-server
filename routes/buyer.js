const express = require("express");
const router = express.Router();
const { Buyer } = require("../models/buyer");
router.post("/", async (req, res) => {
  try {
    req.body.Date = new Date();
    let buyer = new Buyer(req.body);
    buyer = await buyer.save();
    if (buyer)
      res.send({ status: true, msg: "Your Details Submitted Successfully." });
    else throw error;
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Your details not submitted.", error: err });
  }
});
module.exports = router;
