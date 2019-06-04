const express = require("express");
const router = express.Router();
const config = require("config");
const { Property } = require("../models/property");
const { Header } = require("../models/property");
const multerUploads = require("../utility/multipartform");
const { cloudinaryUpload, cloudinaryDelete } = require("../utility/cloudinary");
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
      req.body.ImagePublicId = uploadRes.public_id;
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
router.get("/", auth, async (req, res) => {
  try {
    const properties = await Property.find();
    res.send(properties);
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to find Properties", error: err });
  }
});
router.delete("/", adminAuth, async (req, res) => {
  try {
    const delRes = await Property.findOneAndDelete(req.body);
    if (delRes) {
      await cloudinaryDelete(delRes.ImagePublicId);
      res.send({ status: true, msg: "Property Deleted." });
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to Delete Property", error: err });
  }
});
router.post("/search", async (req, res) => {
  try {
    const properties = await Property.find(req.body).sort({ Date: -1 });
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
      }&authkey=275294A6MSZJwM5ccfbcd4&message=##OTP##&sender=RENTCR`,
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
router.post("/sendmsg", async (req, res) => {
  try {
    var http = require("http");
    var options = {
      method: "GET",
      hostname: "api.msg91.com",
      port: null,
      path: `/api/sendhttp.php?mobiles=${
        req.body.mobile
      }&authkey=275294A6MSZJwM5ccfbcd4&route=4&sender=RENTCR&message=${
        req.body.msg
      }&country=91`,
      headers: {}
    };
    var req1 = http.request(options, function(res1) {
      var chunks = [];

      res1.on("data", function(chunk) {
        chunks.push(chunk);
      });
      res1.on("end", function() {
        var body = Buffer.concat(chunks);
        //res.send(body.toString());
        res.send({ status: true, type: "success", ress: body.toString() });
      });
    });

    req1.end();
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to Send msg", error: err });
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
/*router.put("/markunread", async (req, res) => {
  try {
    const result = await Property.updateMany({}, { MarkAsRead: false });
    if (result && result.nModified)
      res.send({ status: true, msg: "Property marked as unread." });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to update Property", error: err });
  }
});*/
router.post("/addheader", adminAuth, async (req, res) => {
  try {
    let header = new Header(req.body);
    header = await header.save();
    if (header) res.send({ status: true, msg: "Header added." });
    else throw error;
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to add Headers", error: err });
  }
});
router.put("/updateheader", adminAuth, async (req, res) => {
  try {
    const result = await Header.update(req.body.condation, req.body.updateData);
    if (result && result.nModified)
      res.send({ status: true, msg: "Header updated.", res: result });
    else {
      throw result;
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to update Header", error: err });
  }
});
router.get("/avoidheaders", auth, async (req, res) => {
  try {
    if (req.user.userType === "admin") {
      res.send({ avoidheaders: [] });
    } else {
      const headers = await Header.findOne({ topId: 1 }).lean();
      const headersArray = Object.entries(headers);
      let avoidheaders = [];
      headersArray.forEach(element => {
        if (element[1] === false) {
          avoidheaders.push(element[0]);
        }
      });
      res.send({ avoidheaders });
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to find Header", error: err });
  }
});
router.get("/headers", adminAuth, async (req, res) => {
  try {
    const headers = await Header.findOne({ topId: 1 }).lean();
    res.send({ headers });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "Unable to find Header", error: err });
  }
});
module.exports = router;
