const jsonwebtoken = require("jsonwebtoken");

const generateJWToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

module.exports = generateJWToken;
