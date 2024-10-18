//este archivo es el que antes llamabamos index del servidor

// document.getElementById('user-responses').addEventListener('submit', function(event) {
//   event.preventDefault();

//   // Captura las respuestas del usuario
//   const location = document.getElementById('location').value;
//   const skills = document.getElementById('skills').value;
//   const goal = document.getElementById('goal').value;

//   // Enviar las respuestas al servidor
//   fetch('http://localhost:5050/generate-image', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       location: location,
//       skills: skills,
//       goal: goal
//     }),
//   })
//   .then(response => response.json())
//   .then(imageUrl => {
//     // Mostrar la imagen generada en la página
//     document.getElementById('vision-board').src = imageUrl;
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// });

const { createServer } = require('http');

const app = require('./app.js');
const { initSocket } = require('./socket.js');

const httpServer = createServer(app); // Explicity creates an HTTP server from the Express app

// Initialize Socket.IO
initSocket(httpServer);



httpServer.listen(5050, () => console.log('server starting 🚀🆙✔ on http://localhost:5050'));

//para importar la base de datos
//const db =require("./db");

//hay que importar los helpers
//const {assignRoles}= require("./utils/helpers");

//tengo que importar la funcion de handleEvents, ala parecer se hace en el socket
//const { handleEvents } = require("./events/index.js");
