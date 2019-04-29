const express = require("express");
const router = express.Router();
const config = require("config");
const { Property } = require("../models/property");
const multerUploads = require("../utility/multipartform");
const cloudinaryUpload = require("../utility/cloudinary");
const { auth, adminAuth } = require("../middleware/auth");
router.post("/", auth, multerUploads.single("Image"), async (req, res) => {
  try {
    let uploadRes = await cloudinaryUpload(
      req.file,
      config.get("cloudnaryDir")
    );
    let property = new Property({
      name: "Yogy",
      phone: "89520",
      email: "email.cm",
      image: uploadRes.secure_url
    });
    property = await property.save();
    res.send(property);
  } catch (err) {
    res.send({ from: "catch", error: err });
  }
});
router.delete("/", adminAuth, async (req, res) => {
  res.send(req.user);
});
module.exports = router;
