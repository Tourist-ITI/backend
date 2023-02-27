const { commentModel: Comment } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

const { isAdmin } = require("../auth/auth");

exports.createComment = async (req, res, next) => {
  try {
    //    await isAdmin(req.userID);
    console.log(req.body);

    const handleData = {
      ...req.body,
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    };
    const comment = new Comment(handleData);

    await Comment.create(handleData);

    successHandler(res, comment, "comment created successfully");
  } catch (err) {
    next(err);
  }
};
