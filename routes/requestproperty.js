const express = require("express");
const router = express.Router();
const { RequestProperty } = require("../models/requestProperty");
const { auth, adminAuth } = require("../middleware/auth");
const { pNumRefctor } = require("../middleware/pNumRefctor");
router.post("/", pNumRefctor, async (req, res) => {
  try {
    req.body.Date = new Date();
    req.body.MarkAsRead = false;
    let property = new RequestProperty(req.body);
    property = await property.save();
    if (property) res.send({ status: true, msg: "Property request sent." });
    else throw error;
  } catch (err) {
    res.status(500).send({
      status: false,
      msg: "Property request didn't added.",
      error: err
    });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const properties = await RequestProperty.find();
    res.send(properties);
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to find Properties", error: err });
  }
});
router.delete("/", adminAuth, async (req, res) => {
  try {
    const delRes = await RequestProperty.deleteOne(req.body);
    if (delRes) res.send({ status: true, msg: "Property Deleted." });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to Delete Property", error: err });
  }
});
router.post("/search", auth, async (req, res) => {
  try {
    const properties = await RequestProperty.find(req.body).sort({ Date: -1 });
    res.send(properties);
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to find Properties", error: err });
  }
});

router.put("/updateproperty", async (req, res) => {
  try {
    const result = await RequestProperty.update(
      req.body.condation,
      req.body.updateData
    );
    if (result && result.nModified)
      res.send({ status: true, msg: "Property updated.", res: result });
    else {
      throw result;
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to update Property", error: err });
  }
});
module.exports = router;
