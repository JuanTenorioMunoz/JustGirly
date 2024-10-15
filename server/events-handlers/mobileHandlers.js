// eventsExampleHandlers.js
const { v4: uuidv4 } = require('uuid'); // Para generar IDs únicos
const { users } = require('../db'); // Importamos el array de usuarios

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
		const firstQuestion = db.questions[0]; // De la base de datos

		// Verificar si io está correctamente disponible
		if (io) {
			// Emitir el evento a todos los clientes conectados
			io.emit('displayFirstQuestion', firstQuestion);
			console.log('Evento displayFirstQuestion emitido con la pregunta:', JSON.stringify(firstQuestion, null, 2)); // Mostrar el objeto de forma legible
		} else {
			console.error('Error: io no está disponible');
		}
	};
};

const nextQuestionHandler = (socket, db, io) => {
	return () => {};
};

const saveAnswersHandler = (socket, db, io) => {
	const calc = Math.random() * 2;
	console.log('LOGGGGGGGGGGGG');
	console.log(calc);

	return () => {};
};
//ENDPOINT

const startWaitingProcessHandler = () => {
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
