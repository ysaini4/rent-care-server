const express = require("express");
const router = express.Router();
const config = require("config");
const { Property } = require("../models/property");
const multerUploads = require("../utility/multipartform");
const cloudinaryUpload = require("../utility/cloudinary");
router.post("/", multerUploads.single("image"), async (req, res) => {
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
module.exports = router;
