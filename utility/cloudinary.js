var cloudinary = require("cloudinary");
const Datauri = require("datauri");
const dUri = new Datauri();
const path = require("path");

const cloudinaryUpload = async function(reqFile, dir) {
  let fileString;
  if (reqFile) {
    const dataUri = reqFile =>
      dUri.format(
        path.extname(reqFile.originalname).toString(),
        reqFile.buffer
      );
    fileString = dataUri(reqFile).content;
  }
  if (fileString) {
    let cloudRes = await cloudinary.v2.uploader.upload(fileString, {
      folder: dir
    });
    return cloudRes;
  }
  return;
};
module.exports = cloudinaryUpload;
