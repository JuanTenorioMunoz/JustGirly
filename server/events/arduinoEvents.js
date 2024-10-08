const db = require("../db");
const { presenceToServer} = require("../events-handlers/arduinoHandlers");

const arduinoEvent = (socket, io) => {
  socket.on("presenceToServer", presenceToServer(socket, db, io));
};

module.exports = { arduinoEvent };
