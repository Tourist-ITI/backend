const { userModel, tourModel} = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

exports.addToFavorites = async (req, res, next) =>{
    try {
        const { tourId } = req.params;

        const tour = await tourModel.findOne({id:tourId});
        const user = await userModel.findById(req.userID);
        console.log("this tour",tour);
        console.log("this is user",user);
        if (!tour) {
            throw errorHandler("tour not found", 404);
          }
          const favoritesArr = user.favorite_tours;
          console.log("favArr",favoritesArr);
          await userModel.updateOne(
            { favorite_tours: favoritesArr.push(tour) }
          );
        
        successHandler(res, user.favorite_tours, "tour was add to favorites successfully");
    } catch (err) {
        next(err);
    }
}