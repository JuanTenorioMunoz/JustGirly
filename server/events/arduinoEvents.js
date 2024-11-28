const db = require("../db");
const { presenceToServerHandler, setFinalScreenHandler, removeFinalScreenHandler} = require("../events-handlers/arduinoHandlers");

const arduinoEvent = (socket, io) => {
 // socket.on("presenceToServer", arduinoEventHandler.presenceToServer(socket, db, io)); asi esta en el video 
 socket.on("presenceToServer", presenceToServerHandler(socket, db, io)); //deberia ser por endpoint
 socket.on("setFinalScreen", setFinalScreenHandler(socket, db, io)); 
 socket.on("removeFinalScreen", removeFinalScreenHandler(socket, db, io)); 
};

module.exports = { arduinoEvent };
