// eventsExampleHandlers.js
const { v4: uuidv4 } = require('uuid'); // Para generar IDs únicos
const { users, questions } = require('../db'); // Importamos el array de usuarios

const { utilFuntion1, utilFuntion2 } = require('../utils/helpers');

// Assuming db and io are required or passed in some way to be accessible
const userConnectedServerHandler = (socket, db, io) => {
	return () => {
		const newUser = {
			id: uuidv4(), // Generar un ID único para el nuevo usuario
			socketId: socket.id, // Almacenar el ID del socket para referencia
			answers: [], // Inicializar un array vacío para las respuestas del usuario
		};

		// Guardar el nuevo usuario en la base de datos (array `users`)
		users.push(newUser);

		console.log(`Nuevo usuario conectado: ${newUser.id}`);

		// Emitir un evento para que el cliente TV detecte la nueva conexión
		io.emit('newUserConnected', newUser.id);

		// Devolver el ID del usuario para usarlo posteriormente
		return newUser.id;
	};
};

const startQuestionsHandler = (socket, db, io) => {
	return () => {
// Emitir el evento para preparar el inicio
if (io) {
	io.emit('prepareToStart'); // Cambiar a prepareToStart
	console.log('Evento prepareToStart emitido');
} else {
	console.error('Error: io no está disponible');
}
};
}

const nextQuestionHandler = (socket, db, io) => {
	return () => {};
};

const saveAnswersHandler = (socket, db, io, answer, questionId) => {
	const user = users.find((u) => u.socketId === socket.id);

	if (user) {
		user.answers.push({ questionId, answer });
		console.log(`Respuesta guardada para el usuario ${user.id}: Pregunta ${questionId} - Respuesta: ${answer}`);

		// Emitimos la siguiente pregunta a client-TV
		if (questionId < db.questions.length) { // Aseguramos que haya más preguntas
			const nextQuestion = db.questions[questionId]; // La siguiente pregunta
			io.emit('nextQuestion', nextQuestion); // Enviamos la siguiente pregunta a client-TV
		}

		// Si es la última pregunta (pregunta 10 en este caso)
		if (questionId === 10) {
			io.emit('startWaitingProcess'); // Iniciar proceso de espera
		}
	}
};
//ENDPOINT

const startWaitingProcessHandler = () => {
	io.emit('startWaitingProcess');
	return () => {
		//CREAR PROMPT, ENVIARLO A VISION AI
		//EMITIR EVENTO PARA CAMBIAR TV SCREEN
		//AWAIT RESPONSE OF PROMPT RESULT AI
		//ALMACENAR EN FIREBASE -> DB (URL)
		//LISTEN FOR saveUserInfo()
		//UserExists? No = save Image and imageID
	};
};

const saveUserInfoHandler = () => {
	return () => {
		//SAVE DATA IN DB
		//verificar la ultima imagen guardada en Firebase
		//Relacionar imagen con userID(Firebase?)
		//AWAIT imageExists? No = Create User and userID
		//else
	};
};

const enableContinueHandler = () => {
	return () => {};
};

const disableContinueHandler = () => {
	return () => {};
};

const questionHandlerHandler = () => {
	return () => {};
};

const urlRedirectHandler = () => {
	return () => {};
};

module.exports = {
	userConnectedServerHandler,
	startQuestionsHandler,
	nextQuestionHandler,
	saveAnswersHandler,
	startWaitingProcessHandler,
	saveUserInfoHandler,
};
