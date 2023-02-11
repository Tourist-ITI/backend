// function to handle error
function errorHandler(error = "Something went wrong", status = 500) {
  return {
    status,
    response: {
      success: false,
      message: error,
    },
  };
}

// function to handle success
function successHandler(
  res,
  data,
  message = "Data retrieved successfully",
  status = 200
) {
  res.status(status).send({
    success: true,
    message,
    data,
  });
  // return {
  //   status,
  //   response: {
  //     success: true,
  //     message,
  //     data,
  //   },
  // };
}

module.exports = {
  errorHandler,
  successHandler,
};
