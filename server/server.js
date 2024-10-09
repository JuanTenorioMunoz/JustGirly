//este archivo es el que antes llamabamos index del servidor

const { createServer } = require("http");

const app = require("./app.js");
const { initSocket } = require("./socket.js");

const httpServer = createServer(app) // Explicity creates an HTTP server from the Express app

// Initialize Socket.IO
initSocket(httpServer);

httpServer.listen(5050, () => console.log("server starting 🚀🆙✔ on http://localhost:5050"));

//para importar la base de datos
//const db =require("./db");

//hay que importar los helpers
//const {assignRoles}= require("./utils/helpers");

//tengo que importar la funcion de handleEvents, ala parecer se hace en el socket
//const { handleEvents } = require("./events/index.js");
