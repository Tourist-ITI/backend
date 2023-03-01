const { commentModel: Comment, tourModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

const { isAdmin } = require("../auth/auth");

exports.createComment = async (req, res, next) => {
  try {
    //    await isAdmin(req.userID);
    const { tourId } = req.params;

    const tour = await tourModel.findById(tourId);

    if (!tour) {
      throw errorHandler("tour not found", 404);
    }
    const handleData = {
      title: req.body.title,
      content: req.body.content,
      rating: req.body.rating,
      user: req.userID,
      tour: tourId,
    };
    const comment = new Comment(handleData);

    await Comment.create(handleData);

    // const commentsArr = tour.comments;

    // await tourModel.updateOne(
    //   { id: tourId },
    //   { comments: commentsArr.push(comment.id) }
    // );
    // console.log(tour);

    successHandler(res, comment, "comment created successfully");
  } catch (err) {
    next(err);
  }
};
