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
		const questions = db.questions; // Obtener las preguntas de la base de datos

		if (io) {
			io.emit('prepareToStart', questions); // Emitir 'prepareToStart' con las preguntas
			console.log('Evento prepareToStart emitido con preguntas:', questions);
		} else {
			console.error('Error: io no está disponible');
		}
	};
};

const nextQuestionHandler = (socket, db, io) => {
	return () => {};
};

const saveAnswersHandler = (socket, db, io) => {
	socket.on('saveAnswers', (answer, questionCounter) => {
		const userId = getUserIdFromSocket(socket.id); // Obtén el ID del usuario desde el socket

		// Guardar la respuesta en la base de datos bajo el usuario correspondiente
		const user = users.find((user) => user.id === userId);
		if (user) {
			user.answers[questionCounter] = answer; // Guardar respuesta en el índice correspondiente
			console.log(`Respuesta guardada para el usuario ${userId}: ${answer}`);
		}

		// Emitir la siguiente pregunta
		const nextQuestion = getQuestionFromDatabase(questionCounter + 1); // Obtener la siguiente pregunta
		if (nextQuestion) {
			io.emit('nextQuestion', nextQuestion);
		}
	});
};

const startWaitingProcessHandler = (socket, db, io) => {
	socket.on('startWaitingProcess', () => {
		console.log('Iniciando proceso de espera para todos los usuarios...');
		// Lógica para el proceso de espera (puedes incluir tiempo de espera o cualquier otra cosa que necesites)
		io.emit('startWaitingProcess'); // Notificar a todos los clientes
	});
};

//ENDPOINT

//const startWaitingProcessHandler = () => {
//io.emit('startWaitingProcess');
//return () => {
//console.log('Iniciando proceso de espera para usuario:', socket.id);
//CREAR PROMPT, ENVIARLO A VISION AI
//EMITIR EVENTO PARA CAMBIAR TV SCREEN
//AWAIT RESPONSE OF PROMPT RESULT AI
//ALMACENAR EN FIREBASE -> DB (URL)
//LISTEN FOR saveUserInfo()
//UserExists? No = save Image and imageID
//	};
//};

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
