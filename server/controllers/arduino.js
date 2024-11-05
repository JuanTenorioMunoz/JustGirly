const db = require("../db");
const { getIO } = require("../socket");

const presenceToServer = async (req, res) => {
  try {
    res.status(200).send("Sensor activated!");

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {presenceToServer};
