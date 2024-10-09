const db = require("../db");
const { presenceToServerHandler} = require("../events-handlers/arduinoHandlers");

const arduinoEvent = (socket, io) => {
 // socket.on("presenceToServer", arduinoEventHandler.presenceToServer(socket, db, io)); asi esta en el video 
 socket.on("presenceToServer", presenceToServerHandler(socket, db, io)); //deberia ser por endpoint
};

module.exports = { arduinoEvent };
