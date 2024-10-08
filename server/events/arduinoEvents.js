const db = require("../db");
const { event1Handler, event2Handler} = require("../events-handlers/arduinoHandlers");

const arduinoEvent = (socket, io) => {
  socket.on("event1", event1Handler(socket, db, io));
  socket.on("event1", event2Handler(socket, db, io));
};

module.exports = { arduinoEvent };
