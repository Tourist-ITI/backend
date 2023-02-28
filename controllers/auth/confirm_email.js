const { SendEmail } = require("../../middlewares/nodemailer/nodemailer");
const { successHandler } = require("../../utils/responseHandler");

exports.confirmEmail = async (req, res, next) => {
  try {
    const email = await SendEmail("ahmedeldedoky99@gmail.com", "hi Ahmed");
    console.log(email);
    successHandler(res, email, "email send Successfully");
  } catch (err) {
    next(err);
  }
};
