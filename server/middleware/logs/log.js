const colors = require("colors");
const logHandler = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
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
