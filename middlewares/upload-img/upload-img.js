const multer = require("multer");
const sharp = require("sharp");
const { errorHandler } = require("../../utils/responseHandler");

//file
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads");
  },
  filename: (req, file, cd) => {
    const ext = file.mimetype.split("/")[1];
    cd(null, `user-${req.userID}-${Date.now()}.${ext}`);
  },
});
//buffer
const multerStorage = multer.memoryStorage();

const fileFilter = (req, file, cd) => {
  if (file.mimetype.startsWith("image")) cd(null, true);
  else cb(errorHandler("file must be image", 400), false);
};

exports.resizeTourImage = async (req, res, next) => {
  if (!req.files) next();

  req.files.photos = await Promise.all(
    req.files.photos.map((item) => sharpHandler(item.buffer, req.userID))
  );
  req.files.expected_photos = await Promise.all(
    req.files.expected_photos.map((item) =>
      sharpHandler(item.buffer, req.userID)
    )
  );
  next();
};

const upload = multer({ storage: multerStorage, fileFilter });
//upload single image
exports.uploadSingleImage = (image) => upload.single(image);

//upload multiple image
exports.uploadMultiImages = (arrayOfFields) => upload.fields(arrayOfFields);

const sharpHandler = async (buffer, id) => {
  const uniqueNumber = Date.now();
  await sharp(buffer)
    .resize(500, 500, { fit: "contain" })
    .toFormat("jpeg")
    .webp({ quality: 90 })
    .toFile(`uploads/user-${id}-${uniqueNumber}.jpeg`);

  return `uploads/user-${id}-${uniqueNumber}.jpeg`;
};
