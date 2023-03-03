const { userModel, tourModel} = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

exports.addToFavorites = async (req, res, next) =>{
    try {
        console.log(req.params);
        const { tourId } = req.params;
        const { userId } = req.body;
        const tour = await tourModel.findOne({id:tourId});
        const user = await userModel.findOne({id:userId});
        console.log(tour,user);
        if (!tour) {
            throw errorHandler("tour not found", 404);
          }
          console.log(user);
          const favoritesArr = user.favorite_tours;
          console.log("favArr",favoritesArr);
          await userModel.updateOne(
            { favorite_tours: favoritesArr.push(tourId) }
          );
        
        successHandler(res, user.favorite_tours, "tour was add to favorites successfully");
    } catch (err) {
        next(err);
    }
}