const { CustomError } = require("../../error/custom");
const errorHandlingMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ name: err.name, msg: err.message });
  }
  return res.status(500).json({
    name: `Unknown error in ${req.originalURL}`,
    msg: "Something went wrong, please try again",
  });
};

module.exports = errorHandlingMiddleware;
