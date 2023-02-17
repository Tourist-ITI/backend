const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "dykh961g7",
  api_key: "168819213622196",
  api_secret: "rAo4T-_lAqq6lufeyRGnp5BlVSU",
});

// Upload
exports.uploadCloud = async (file) => {
  const result = await cloudinary.uploader.upload(file);
  if (result) {
    fs.unlinkSync(`uploads/${result.original_filename}.${result.format}`);
    return { url: result.url, public_id: result.public_id };
  }
};

exports.cloudUploadImages = (arr) => {
  return Promise.all(
    arr.map(async (item) => await this.uploadCloud(item.path))
  );
};
