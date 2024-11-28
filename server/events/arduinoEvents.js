const db = require("../db");
const { presenceToServerHandler, finalScreenHandler} = require("../events-handlers/arduinoHandlers");

const arduinoEvent = (socket, io) => {
 // socket.on("presenceToServer", arduinoEventHandler.presenceToServer(socket, db, io)); asi esta en el video 
 socket.on("presenceToServer", presenceToServerHandler(socket, db, io)); //deberia ser por endpoint
 socket.on("finalScreen", finalScreenHandler(socket, db, io)); 
};

module.exports = { arduinoEvent };
