const asyncHandler = require("express-async-handler");
const { CustomError } = require("../error/custom");
const UserModel = require("../models/User");
const TokenModel = require("../models/Token");
const generateJWToken = require("../config/webtoken");
const sendEmail = require("../utils/sendEmail");

const sendOTP = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { gmail } = req.body;
    const token = generateJWToken(id);
    let isDeleted = await TokenModel.deleteOne({
      userId: id,
    });
    const Token = await TokenModel.create({
      userId: id,
      token: token,
    });
    await sendEmail(
      gmail,
      "Activate your account in Web-Chat-App!",
      `Please click the below link for verification: \n\nThis link will expire in 10 minutes\n${process.env.BASE_URL}/otp/${Token.userId}/verify/${Token.token}\n\n\n\tIf you have any queries regarding this email feel free to contact this email address`
    );
    res.status(200).send("Verification link sent successfully!");
  } catch (err) {
    console.log(err);
    throw new CustomError("Can't send the message", 400);
  }
});

const verifyOTP = asyncHandler(async (req, res) => {
  try {
    const { id, token } = req.params;
    const user = await UserModel.findOne({ _id: id });
    if (!user) throw new CustomError("Invalid link!", 400);

    const tokenFound = await TokenModel.findOne({
      userId: id,
      token: token,
    });
    if (!tokenFound) throw new CustomError("Invalid link!", 400);
    await UserModel.findByIdAndUpdate(user._id, {
      verified: true,
    });
    await tokenFound.remove();

    res
      .status(200)
      .send(
        "Email verified successfully! You can now close this tab and login into the chat app"
      );
  } catch (error) {
    console.log(error);
    throw new CustomError("Invalid link", 400);
  }
});

module.exports = {
  sendOTP,
  verifyOTP,
};
