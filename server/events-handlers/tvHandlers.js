// eventsExampleHandlers.js

const { utilFuntion1, utilFuntion2 } = require('../utils/helpers');
const { users, currentPrompt, currentvs, currentUserFromSupa } = require('../db/index');
const { getAllUsers } = require('../db/entities/users');
const { sendEmailWithTemplate, sendEmail } = require('../services/brevo');

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
		try {
			// Obtener todos los usuarios desde Supabase
			const allUsers = await getAllUsers();

			if (allUsers && allUsers.length > 0) {
				// Seleccionar 5 usuarios al azar
				const randomUsers = allUsers.sort(() => 0.5 - Math.random()).slice(0, 5);

				// Emitir los datos de los 5 usuarios seleccionados a los clientes conectados
				io.emit('showVBs', randomUsers);
				console.log('5 usuarios seleccionados y enviados:', randomUsers);
			} else {
				console.log('No se encontraron usuarios en la base de datos.');
			}
		} catch (error) {
			console.error('Error al obtener usuarios desde Supabase:', error.message);
		}
	};
};

module.exports = {
	getVBsHandler,
	showVBsHandler,
	getQuestionsHandler,
};
