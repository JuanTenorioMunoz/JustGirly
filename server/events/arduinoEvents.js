const db = require("../db");
const { presenceToServerHandler, setFinalScreenHandler} = require("../events-handlers/arduinoHandlers");

const arduinoEvent = (socket, io) => {
 // socket.on("presenceToServer", arduinoEventHandler.presenceToServer(socket, db, io)); asi esta en el video 
 socket.on("presenceToServer", presenceToServerHandler(socket, db, io)); //deberia ser por endpoint
 socket.on("setFinalScreen", setFinalScreenHandler(socket, db, io)); 
};

module.exports = { arduinoEvent };
