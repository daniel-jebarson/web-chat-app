const jsonwebtoken = require("jsonwebtoken");

const generateJWToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
  });
};

module.exports = generateJWToken;
