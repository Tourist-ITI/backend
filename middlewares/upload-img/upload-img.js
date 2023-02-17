const multer = require("multer");
const { errorHandler } = require("../../utils/responseHandler");
// const multerOptionStorage = () => {
//   //to transfer image to memory buffer
//   const memory = multer.memoryStorage();
//   // verify user upload image only
//   const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image")) {
//       cb(null, true);
//     } else {
//       cb(errorHandler("file must be image", 400), false);
//     }
//   };
//   const upload = multer({ storage: memory, fileFilter });
//   return upload;
// };

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads");
  },
  filename: (req, file, cd) => {
    const ext = file.mimetype.split("/")[1];
    cd(null, `user-${req.userID}-${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, cd) => {
  if (file.mimetype.startsWith("image")) cd(null, true);
  else cb(errorHandler("file must be image", 400), false);
};

const upload = multer({ storage, fileFilter });
//upload single image
exports.uploadSingleImage = (image) => upload.single(image);

//upload multiple image
exports.uploadMultiImages = (arrayOfFields) => upload.fields(arrayOfFields);
