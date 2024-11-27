// eventsExampleHandlers.js
const { v4: uuidv4 } = require('uuid'); // Para generar IDs únicos
const { users, currentPrompt, currentvs, currentsupaurl, currentUserFromSupa } = require('../db'); // Importamos el array de usuarios
const { createUser, updateUser, updateVB, getUserById } = require('../db/entities/users.js');
const { createVisionBoardPrompt } = require('../db/entities/ia.js');
const { uploadImageFromAI } = require('../storage/upload.js');
const { sendEmailWithTemplate, sendEmail } = require('../services/brevo');
require('dotenv/config');

//ia
const OpenAI = require('openai');
const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
});
const fs = require('fs');

// Assuming db and io are required or passed in some way to be accessible
const userConnectedServerHandler = (socket, db, io) => {
	return () => {
		const newUser = {
			id: uuidv4(), // Generar un ID único para el nuevo usuario
			socketId: socket.id, // Almacenar el ID del socket para referencia
			answers: [], // Inicializar un array vacío para las respuestas del usuario
			name: '', // Campo vacío para el nombre del usuario
			email: '', // Campo vacío para el email del usuario
			url: '',
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
				// Crea el usuario en la base de datos y guarda el prompt en `currentPrompt[userId]`
				const createdUser = await createUser(user.answers, userId);
				console.log('Usuario creado en la base de datos:', createdUser);

				// Genera el prompt usando las respuestas del usuario
				currentPrompt[userId] = createVisionBoardPrompt(user.answers);
				console.log('Prompt generado:', currentPrompt[userId]);

				// Genera la imagen usando el prompt y guarda el URL en `currentvs[userId]`
				const response = await openai.images.generate({
					model: 'dall-e-3',
					prompt: currentPrompt[userId],
					n: 1,
					size: '1024x1024',
				});

				const image_url = response.data[0].url;
				currentvs[userId] = { image_url };
				console.log(`URL de la imagen guardado en currentvs para el usuario ${userId}:`, currentvs[userId]);

				// Llama a uploadImageFromAI para subir la imagen a Supabase
				const uploadResult = await uploadImageFromAI(image_url, userId);
				//const geturlcurrent = await getVBForUser(userId);

				if (uploadResult) {
					console.log(`Imagen subida exitosamente para el usuario ${userId}:`, uploadResult);

					// Actualizar la casilla `url` del usuario en Supabase usando el valor en `currentsupaurl`
					const url = currentsupaurl[userId]; // Obtener el valor correcto de currentsupaurl
					const updatedVB = await updateVB(userId, url);
					if (updatedVB) {
						console.log(`URL actualizado en Supabase para el usuario ${userId}:`, updatedVB);
						const userData = await getUserById(userId);
						if (!userData || userData.length === 0) {
							console.error('Usuario no encontrado en Supabase con ID:', userId);
							return;
						}

						// Asigna los datos del usuario al objeto vbfromsupa
						const currentUserFromSupa = userData[0]; // Suponiendo que es el primer resultado

						console.log('Usuario obtenido de Supabase:', currentUserFromSupa);
						//	io.emit('InfoforEmail', currentUserFromSupa);
						try {
							// Llamamos a la función para enviar el correo
							await sendEmailWithTemplate(currentUserFromSupa);

							// Si es necesario, puedes emitir un evento de confirmación al cliente
							io.emit('emailSent', { success: true, message: 'Correo enviado correctamente' });
						} catch (error) {
							// Si ocurre un error, emitir una respuesta de error
							io.emit('emailSent', { success: false, message: 'Hubo un error al enviar el correo' });
						}
					}

					io.emit('VBreceived', currentvs); // Cambiar de la screen 6 a la 7 en TV
				}
			} catch (error) {
				console.error('Error al crear el usuario en la base de datos o al generar la imagen:', error);
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

const saveUserInfoHandler = (socket, db, io) => {
	return async (userInfo) => {
		const userId = getUserIdFromSocket(socket.id, db.users);
		const userName = userInfo.name;
		const userEmail = userInfo.email;

		// Reemitir el evento a todos los clientes conectados (incluyendo el cliente de TV)
		io.emit('userInfoSaved');
		console.log('DID SOMETHING');
		console.log('IM id ' + userId);
		console.log('IM name ' + userName);
		console.log('IM anser ' + userEmail);
		const updatedUser = await updateUser(userId, userName, userEmail); //SAVE DATA EMAIL AND NAME IN DB
		console.log('updated info in supaaaaaaaaaaaaaaaaaaaaaaaaaa' + updatedUser);
	};
};

module.exports = {
	userConnectedServerHandler,
	startQuestionsHandler,
	nextQuestionHandler,
	saveAnswersHandler,
	startWaitingProcessHandler,
	saveUserInfoHandler,
};
