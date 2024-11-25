// eventsExampleHandlers.js

const { utilFuntion1, utilFuntion2 } = require('../utils/helpers');
const { users, currentPrompt, currentvs } = require('../db');
const { getVBsFromSupa } = require('../storage/upload.js');

const getQuestionsHandler = (socket, db, io) => {
	return () => {
		const questions = db.questions; // Obtener las preguntas de la base de datos
		socket.emit('getQuestions', questions); // Enviar preguntas al cliente
		console.log('Preguntas enviadas al cliente TV:', questions);
	};
};

const getVBsHandler = (socket, db, io) => {
	return () => {
		const currentvs = db.currentvs; // Obtener el Vision Board de la base de datos
		io.emit('getVBs', currentvs); // Emitir los datos a todos los clientes
		console.log('VB enviado:', currentvs);
	};
};

const showVBsHandler = (socket, db, io) => {
	return async () => {
		// Llama a uploadImageFromAI para subir la imagen a Supabase
		const visionBoardUrls = await getVBsFromSupa();

		if (visionBoardUrls) {
			console.log(`vbs de users:`, visionBoardUrls);
			io.emit('showVBs', visionBoardUrls);
		}
	};
};

const changeScreenHandler = () => {
	return () => {};
};

module.exports = {
	changeScreenHandler,
	getVBsHandler,
	showVBsHandler,
	getQuestionsHandler,
};
