const db = require("../db");
const { getVBsHandler, showVBsHandler} = require("../events-handlers/tvHandlers");

const tvEvent = (socket, io) => {
  socket.on("getVBs", getVBsHandler(socket, db, io));
  socket.on("showVBs", showVBsHandler(socket, db, io));
};

module.exports = { tvEvent };
