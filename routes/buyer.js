const express = require("express");
const router = express.Router();
const { Buyer } = require("../models/buyer");
const { Property } = require("../models/property");

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
router.post("/search", async (req, res) => {
  try {
    const buyer = await Buyer.find(req.body).lean();
    let pIds = [];
    let newBuyer = buyer.map(item => {
      pIds.push(item.pId);
      return {
        BName: item.Name,
        BMobile: item.Mobile,
        BEmail: item.Email,
        pId: item.pId
      };
    });
    const properties = await Property.find({ _id: { $in: pIds } }).lean();
    let newBuyerWithP = newBuyer.map(element => {
      let p = properties.find(item => item._id.toString() === element.pId);

      return (element = { ...element, ...p });
    });
    res.send(newBuyerWithP);
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to find Buyers", error: err });
  }
});
module.exports = router;
