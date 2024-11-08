// eventsExampleHandlers.js
const { v4: uuidv4 } = require('uuid'); // Para generar IDs únicos
const { users, currentPrompt } = require('../db'); // Importamos el array de usuarios
const { createUser, updateUser } = require('../db/entities/users.js');
const { createVisionBoardPrompt } = require('../db/entities/ia.js');

// Assuming db and io are required or passed in some way to be accessible
const userConnectedServerHandler = (socket, db, io) => {
	return () => {
		const newUser = {
			id: uuidv4(), // Generar un ID único para el nuevo usuario
			socketId: socket.id, // Almacenar el ID del socket para referencia
			answers: [], // Inicializar un array vacío para las respuestas del usuario
			name: '', // Campo vacío para el nombre del usuario
			email: '', // Campo vacío para el email del usuario
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
	return async (answer, questionCounter) => {
		const userId = getUserIdFromSocket(socket.id, db.users); // Get user ID using their socket ID
		const user = db.users.find((user) => user.id === userId);

		if (user) {
			user.answers[questionCounter] = answer; // Save the answer at the correct index
			console.log(`Respuesta guardada para el usuario ${userId}: ${answer}`);
		} else {
			console.log('Usuario no encontrado');
			return;
		}

		// Retrieve the next question
		const nextQuestion = db.questions[questionCounter + 1];

		if (nextQuestion) {
			io.emit('nextQuestion', nextQuestion); // Emit the next question to all clients
			console.log(`Enviando la siguiente pregunta: ${nextQuestion.question}`);
		} else {
			console.log('No hay más preguntas.');
			io.emit('startWaitingProcess'); // Emit an event to transition to the waiting screen

			try {
				const createdUser = await createUser(user.answers, userId);
				console.log('Usuario creado en la base de datos:', createdUser);
				// Crear el prompt usando las respuestas del usuario
				currentPrompt[userId] = createVisionBoardPrompt(user.answers);

				// Aquí puedes agregar el código para guardar `currentPrompt[userId]` en la base de datos si es necesario
				console.log('Prompt generado:', currentPrompt[userId]);
			} catch (error) {
				console.error('Error al crear el usuario en la base de datos:', error);
			}
		}
	};
};

// Función auxiliar para obtener el ID del usuario desde el socket ID
const getUserIdFromSocket = (socketId, users) => {
	const user = users.find((user) => user.socketId === socketId);
	return user ? user.id : null;
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

const saveUserInfoHandler = (socket, db, io) => {
	return async (name, email) => {
		const userId = getUserIdFromSocket(socket.id, db.users);
		const userName = name;
		const userEmail = email;
		// Reemitir el evento a todos los clientes conectados (incluyendo el cliente de TV)
		io.emit('userInfoSaved');
		console.log('DID SOMETHING');
		console.log('IM id ' + userId);
		console.log('IM name ' + userName);
		console.log('IM anser ' + userEmail);
		const updatedUser = await updateUser(userId, userName, userEmail); //SAVE DATA EMAIL AND NAME IN DB
		console.log('updated info in supaaaaaaaaaaaaaaaaaaaaaaaaaa' + updatedUser);
		//verificar la ultima imagen guardada en Firebase
		//Relacionar imagen con userID(Firebase?)
		//AWAIT imageExists? No = Create User and userID
		//else
	};
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
