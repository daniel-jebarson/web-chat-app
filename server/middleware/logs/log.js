const colors = require("colors");
const logHandler = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  console.log(
    `${req.method} to ${req.path} ,body= ${JSON.stringify(
      req.body
    )} , headers= ${req.headers.authorization} with params= ${JSON.stringify(
      req.params
    )} and hostname=${req.hostname}\n`.yellow.italic
  );
  next();
};

module.exports = logHandler;
