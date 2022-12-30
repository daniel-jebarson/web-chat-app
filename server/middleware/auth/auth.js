const jwt = require("jsonwebtoken");
const UserModel = require("../../models/User");
const asyncHandler = require("express-async-handler");
const { CustomError } = require("../../error/custom");

const authorizer = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await UserModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      throw new CustomError("Authorization failed!", 401);
    }
  }

  if (!token) {
    throw new CustomError("No token specified to authorize!", 401);
  }
});

module.exports = { authorizer };
