const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Upload
exports.uploadCloud = async (file) => {
  const result = await cloudinary.uploader.upload(file);
  if (result) {
    console.log(result);
    fs.unlinkSync(`uploads/${result.original_filename}.${result.format}`);
    return { url: result.url, public_id: result.public_id };
  }
};

exports.cloudUploadImages = (arr) => {
  return Promise.all(
    arr.map(async (item) => await this.uploadCloud(item.path))
  );
};
