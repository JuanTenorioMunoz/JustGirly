const { createServer } = require('http');
require("dotenv/config");
require("./serial.js")

const app = require('./app.js');
const { initSocket } = require('./socket.js');

const httpServer = createServer(app); // Explicity creates an HTTP server from the Express app

// Initialize Socket.IO
initSocket(httpServer);

httpServer.listen(process.env.PORT, () => console.log(`server starting 🚀🆙✔ on http://localhost:${process.env.PORT}`));
