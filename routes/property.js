const express = require("express");
const router = express.Router();
const config = require("config");
const { Property } = require("../models/property");
const multerUploads = require("../utility/multipartform");
const cloudinaryUpload = require("../utility/cloudinary");
const { auth, adminAuth } = require("../middleware/auth");
const { pNumRefctor } = require("../middleware/pNumRefctor");
router.post(
  "/",
  multerUploads.single("Image"),
  pNumRefctor,
  async (req, res) => {
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
  }
);
router.get("/", adminAuth, async (req, res) => {
  try {
    const properties = await Property.find();
    res.send(properties);
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to find Properties", error: err });
  }
});
router.delete("/", async (req, res) => {
  try {
    const delRes = await Property.deleteOne(req.body);
    if (delRes) res.send({ status: true, msg: "Property Deleted." });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to Delete Property", error: err });
  }
});
router.post("/search", adminAuth, async (req, res) => {
  try {
    const properties = await Property.find(req.body);
    res.send(properties);
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to find Properties", error: err });
  }
});
router.post("/gotp", async (req, res) => {
  try {
    var http = require("http");

    var options = {
      method: "POST",
      hostname: "control.msg91.com",
      port: null,
      path: `/api/sendotp.php?mobile=${
        req.body.mobile
      }&authkey=275294A6MSZJwM5ccfbcd4&message=##OTP##&sender=RNTCR`,
      headers: {}
    };

    var req1 = http.request(options, function(res1) {
      var chunks = [];

      res1.on("data", function(chunk) {
        chunks.push(chunk);
      });

      res1.on("end", function() {
        var body = Buffer.concat(chunks);
        res.send(body.toString());
      });
    });

    req1.end();
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to Generate Otp", error: err });
  }
});
router.post("/votp", async (req, res) => {
  try {
    var http = require("http");

    var options = {
      method: "POST",
      hostname: "control.msg91.com",
      port: null,
      path: `/api/verifyRequestOTP.php?authkey=275294A6MSZJwM5ccfbcd4&mobile=${
        req.body.mobile
      }&otp=${req.body.otp}`,
      headers: {}
    };

    var req1 = http.request(options, function(res1) {
      var chunks = [];

      res1.on("data", function(chunk) {
        chunks.push(chunk);
      });

      res1.on("end", function() {
        var body = Buffer.concat(chunks);
        res.send(body.toString());
      });
    });

    req1.end();
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to Generate Otp", error: err });
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
