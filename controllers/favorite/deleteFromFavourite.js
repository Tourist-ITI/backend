const { userModel, tourModel} = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");


exports.deleteFromFavorites = async (req, res, next) =>{
    try {
        console.log(req.params);
        const { tourId } = req.params;
        const { userId } = req.body;
        const tour = await tourModel.findOne(tourId);
        const user = await userModel.findOne(userId);
        console.log(tour,user);
        if (!tour) {
            throw errorHandler("tour not found", 404);
          }

          const favoritesArr = user.favorite_tours;
          const result = favoritesArr.filter(tId=> favoritesArr[tId] !== favoritesArr[tourId] )
          await userModel.updateOne(
            { favorite_tours: result }
          );
        
        successHandler(res, user.favorite_tours, "tour was removed from favorites successfully");
    } catch (err) {
        next(err);
    }
}