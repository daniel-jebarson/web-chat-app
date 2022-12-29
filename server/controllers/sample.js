const chats = require("../data/data");

const sampleGet = (req, res) => {
  res.status(200).json({ dani: "hello there" });
};

const sampleData = (req, res) => {
  res.status(200).send(chats);
};

const getSampleID = (req, res) => {
  res.status(200).send(chats.find((x) => x._id === req.params.id));
};

module.exports = {
  sampleGet,
  sampleData,
  getSampleID,
};
