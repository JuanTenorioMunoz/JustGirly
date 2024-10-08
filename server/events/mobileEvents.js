const db = require("../db");
const { event1Handler, event2Handler} = require("../events-handlers/mobileHandlers");

const mobileEvents = (socket, io) => {
  socket.on("event1", event1Handler(socket, db, io));
  socket.on("event1", event2Handler(socket, db, io));
};

module.exports = { mobileEvents };
