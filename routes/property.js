const express = require("express");
const router = express.Router();
const config = require("config");
const { Property } = require("../models/property");
const multerUploads = require("../utility/multipartform");
const cloudinaryUpload = require("../utility/cloudinary");
const { auth, adminAuth } = require("../middleware/auth");
router.post("/", multerUploads.single("Image"), async (req, res) => {
  try {
    let uploadRes = await cloudinaryUpload(
      req.file,
      config.get("cloudnaryDir")
    );
    req.body.Image = uploadRes.secure_url;
    req.body.Date = new Date();
    req.body.MarkAsRead = false;
    req.body.Publish = false;
    req.body.ShowAtHome = false;
    let property = new Property(req.body);
    property = await property.save();
    if (property) res.send({ status: true, msg: "Property added." });
    else throw error;
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Property not added.", error: err });
  }
});
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.send(properties);
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to find Properties", error: err });
  }
});
router.post("/search", async (req, res) => {
  try {
    const properties = await Property.find(req.body);
    res.send(properties);
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to find Properties", error: err });
  }
});
router.put("/updateproperty", async (req, res) => {
  try {
    const result = await Property.update(
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
router.put("/markunread", async (req, res) => {
  try {
    const result = await Property.updateMany({}, { MarkAsRead: false });
    if (result && result.nModified)
      res.send({ status: true, msg: "Property marked as unread." });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to update Property", error: err });
  }
});
router.delete("/", adminAuth, async (req, res) => {
  res.send(req.user);
});
module.exports = router;
