const { userModel:User } = require("../../models");

exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user){res.status(404).send('user not found')}
    else{res.status(200).json(user)}
  } catch (err) {
    next(err);
  }
};