const db = require("../db");
const { getVBs, showVBs} = require("../events-handlers/tvHandlers");

const tvEvent = (socket, io) => {
  socket.on("getVBs", getVBs(socket, db, io));
  socket.on("showVBs", showVBs(socket, db, io));
};

module.exports = { tvEvent };
