const db = require('../db');
const { getVBsHandler, showVBsHandler, getQuestionsHandler } = require('../events-handlers/tvHandlers');

const tvEvent = (socket, io) => {
	socket.on('getQuestions', getQuestionsHandler(socket, db, io));
	socket.on('getVBs', () => {
		const currentvs = db.currentvs; // Obtener el Vision Board de la base de datos
		io.emit('getVBs', currentvs); // Emitir el evento con los datos a todos los clientes
		console.log('Enviando currentvs a los clientes:', currentvs);
	});
	socket.on('showVBs', showVBsHandler(socket, db, io));
};

module.exports = { tvEvent };
