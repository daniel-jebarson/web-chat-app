const NotFound = (req, res) =>
  res.status(404).send(`${req.originalURL} not found!`);

module.exports = NotFound;
