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
	socket.on('saveAnswers', (answer, questionCounter) => {
		const userId = getUserIdFromSocket(socket.id, db.users); // Obtener el ID del usuario usando su socket ID

		// Buscar al usuario por ID
		const user = db.users.find((user) => user.id === userId);

		if (user) {
			user.answers[questionCounter] = answer; // Guardar la respuesta en el índice correspondiente
			console.log(`Respuesta guardada para el usuario ${userId}: ${answer}`);
		} else {
			console.log('Usuario no encontrado');
		}

		// Obtener la siguiente pregunta
		const nextQuestion = db.questions[questionCounter + 1];

		if (nextQuestion) {
			// Emitir la siguiente pregunta solo a la pantalla de la TV
			io.emit('nextQuestion', nextQuestion); // Emitir la siguiente pregunta a todos los clientes (puedes cambiar a un namespace si es necesario)
			console.log(`Enviando la siguiente pregunta: ${nextQuestion.question}`);
		} else {
			console.log('No hay más preguntas.');
			io.emit('startWaitingProcess'); // Emitir el evento para pasar a la pantalla de espera si no hay más preguntas
		}
	});
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

	// Datos de ejemplo del usuario
	const users = [
		{
			id: 13432542,
			socketId: 1455757,
			answers: [
				'B. Siempre buscando aprender y mejorar',
				'A. Hacer ejercicio regularmente',
				'D. Soy una persona equilibrada y en crecimiento constante',
				'A. Viaje a la playa',
				'C. Azul: Paz y claridad',
				'B. Alcanzar una meta profesional importante',
				'A. Mi entorno físico (organización de espacios)',
				'C. Compartir mis conocimientos y experiencia',
				'A. Ahorrar/invertir y gestionar mejor mis finanzas',
				'D. Motivación/Empoderamiento',
			],
			name: 'pepito',
			email: 'pepitoemail',
		},
	];

	// Función para generar el prompt basado en las respuestas del usuario
	const createVisionBoardPrompt = (answers) => {
		let promptText = `
	Create a vision board for a woman with aspirations for the year 2025. The vision board should have a cohesive, realistic photographic style, with images overlapping and pinned to the board. The background of the board should always be #E3D5CA, and the frame should always be wood, tightly aligned with the border of the vision board without showing any walls. Include specific photos, limited to three images per aspiration, related to the user's selections: \n\n`;

		// Pregunta 1: Mentalidad y crecimiento personal
		if (answers[0]) {
			promptText += '1. For her mindset and personal growth in 2025, focus on images that represent: ';
			switch (answers[0][0]) {
				case 'A':
					promptText +=
						'confidence and decisiveness, like a mountain peak symbolizing achievements or a bold lion symbolizing strength.';
					break;
				case 'B':
					promptText +=
						'constant learning and improvement, with images like an open book, a staircase symbolizing progress, or a tree growing.';
					break;
				case 'C':
					promptText +=
						'challenging herself to be her best, including images of a runner crossing a finish line, a sunrise, or an arrow hitting a target.';
					break;
				case 'D':
					promptText +=
						'living in harmony with her thoughts and emotions, with serene landscapes like calm oceans, a meditating figure, or a peaceful forest.';
					break;
			}
			promptText += '\n\n';
		}

		// Pregunta 2: Hábito para 2025
		if (answers[1]) {
			promptText += '2. For the habit she would like to incorporate into her daily routine, use images that reflect: ';
			switch (answers[1][0]) {
				case 'A':
					promptText += 'regular exercise, such as a person jogging, a set of gym weights, or a yoga mat.';
					break;
				case 'B':
					promptText +=
						'healthy eating, with vibrant fruits and vegetables, a balanced meal, or a kitchen with fresh ingredients.';
					break;
				case 'C':
					promptText +=
						'learning something new, with images of books, a language app on a phone, or a person practicing a musical instrument.';
					break;
				case 'D':
					promptText +=
						'mindfulness or journaling, with images like a journal, a peaceful meditation scene, or a calm space with candles.';
					break;
			}
			promptText += '\n\n';
		}

		// Pregunta 3: Afirmación resonante
		if (answers[2]) {
			promptText += '3. For the affirmation that resonates for her best version in 2025, focus on images that evoke: ';
			switch (answers[2][0]) {
				case 'A':
					promptText +=
						'peace and self-care, such as a spa-like environment, a person in a bubble bath, or soft, cozy blankets.';
					break;
				case 'B':
					promptText +=
						'success and goal achievement, with images of gold medals, trophies, or a desk with a planner full of completed tasks.';
					break;
				case 'C':
					promptText += 'joy and creativity, featuring bright colors, art supplies, or a person dancing or painting.';
					break;
				case 'D':
					promptText +=
						'balance and constant growth, with images like a scale balancing perfectly, a plant growing, or a peaceful beach at sunset.';
					break;
			}
			promptText += '\n\n';
		}

		// Pregunta 4: Vacaciones soñadas
		if (answers[3]) {
			promptText += '4. For her dream vacation in 2025, choose images that showcase: ';
			switch (answers[3][0]) {
				case 'A':
					promptText +=
						'a beach destination, with golden sands, turquoise waters, and palm trees swaying in the breeze.';
					break;
				case 'B':
					promptText +=
						'a private cabin in the mountains, with cozy wooden interiors, tall pine trees, and snow-covered peaks.';
					break;
				case 'C':
					promptText +=
						'a Eurotrip, featuring iconic landmarks like the Eiffel Tower, the Colosseum, and charming streets with cafes.';
					break;
				case 'D':
					promptText +=
						'an adventure in nature, with images of hiking trails, waterfalls, and camping under the stars.';
					break;
			}
			promptText += '\n\n';
		}

		// Pregunta 5: Color que representa su energía
		if (answers[4]) {
			promptText += '5. For the color that represents her energy in 2025, include imagery featuring: ';
			switch (answers[4][0]) {
				case 'A':
					promptText +=
						'pink, symbolizing self-love and sweetness, with soft pink flowers, a cozy pink blanket, or a pink sunrise.';
					break;
				case 'B':
					promptText +=
						'gold, symbolizing success and prosperity, with shimmering gold coins, a golden trophy, or a vibrant sunset with golden hues.';
					break;
				case 'C':
					promptText += 'blue, symbolizing peace and clarity, with clear blue skies, calm oceans, or blue crystals.';
					break;
				case 'D':
					promptText +=
						'purple, symbolizing transformation and empowerment, with purple flowers, a powerful amethyst crystal, or a majestic purple sunset.';
					break;
			}
			promptText += '\n\n';
		}

		// Pregunta 6: Objetivo para 2025
		if (answers[5]) {
			promptText += '6. For her primary goal in 2025, focus on images that depict: ';
			switch (answers[5][0]) {
				case 'A':
					promptText +=
						'better health and personal growth, with a person meditating, nutritious meals, or a sunrise representing new beginnings.';
					break;
				case 'B':
					promptText +=
						'achieving a major professional goal, with images of a businesswoman in a boardroom, a career milestone celebration, or a completed project.';
					break;
				case 'C':
					promptText +=
						'traveling and discovering new places, featuring iconic landmarks, airplane views, or a backpacker exploring a remote location.';
					break;
				case 'D':
					promptText +=
						'starting a personal or creative project, with art supplies, an entrepreneur brainstorming ideas, or a journal filled with notes.';
					break;
			}
			promptText += '\n\n';
		}

		// Pregunta 7: Aspecto de vida a simplificar
		if (answers[6]) {
			promptText += '7. For the aspect of her life she wants to simplify in 2025, highlight images of: ';
			switch (answers[6][0]) {
				case 'A':
					promptText += 'organized physical spaces, with neat desks, decluttered rooms, or labeled storage bins.';
					break;
				case 'B':
					promptText += 'an efficient daily routine, with a planner, a clock, or a well-organized to-do list.';
					break;
				case 'C':
					promptText +=
						'streamlined relationships, with happy family moments, friends chatting over coffee, or a couple walking in harmony.';
					break;
				case 'D':
					promptText +=
						'focusing on herself, with images of self-reflection, personal style changes, or managing finances responsibly.';
					break;
			}
			promptText += '\n\n';
		}

		// Pregunta 8: Contribución a la comunidad
		if (answers[7]) {
			promptText += '8. For her desire to contribute to the community in 2025, include images that reflect: ';
			switch (answers[7][0]) {
				case 'A':
					promptText +=
						'volunteering for a cause, with a person working at a food bank, cleaning up a park, or teaching children.';
					break;
				case 'B':
					promptText +=
						'starting a project that benefits others, with images of a group working together, a community garden, or a non-profit initiative.';
					break;
				case 'C':
					promptText +=
						'sharing knowledge and experience, featuring a person giving a presentation, leading a workshop, or writing a book.';
					break;
				case 'D':
					promptText +=
						'raising awareness of important topics, with protest signs, an environmental activist, or people discussing key issues.';
					break;
			}
			promptText += '\n\n';
		}

		// Pregunta 9: Enfoque financiero para 2025
		if (answers[8]) {
			promptText += '9. For her main financial focus in 2025, highlight images that showcase: ';
			switch (answers[8][0]) {
				case 'A':
					promptText += 'saving and managing finances, with a piggy bank, a bank statement, or a person budgeting.';
					break;
				case 'B':
					promptText +=
						'investing in herself, such as enrolling in courses, buying equipment for a business, or taking a trip for self-growth.';
					break;
				case 'C':
					promptText +=
						'building a stable financial foundation, with images of financial security like a house, a savings plan, or a retirement account.';
					break;
				case 'D':
					promptText +=
						'achieving financial freedom, featuring images of a person traveling, working remotely, or reaching a financial milestone.';
					break;
			}
			promptText += '\n\n';
		}

		// Pregunta 10: Sentimientos que quiere experimentar
		if (answers[9]) {
			promptText += '10. For the feelings she wants to experience most in 2025, focus on images that evoke: ';
			switch (answers[9][0]) {
				case 'A':
					promptText += 'happiness and fulfillment, with smiling people, joyful gatherings, or a sunny day outdoors.';
					break;
				case 'B':
					promptText +=
						'success and accomplishment, with images of awards, certificates, or a person giving a successful presentation.';
					break;
				case 'C':
					promptText += 'inner peace and calm, with images of nature, yoga, or a person meditating.';
					break;
				case 'D':
					promptText +=
						'motivation and empowerment, featuring a strong woman flexing, a victory pose, or a group of people cheering each other on.';
					break;
			}
			promptText += '\n\n';
		}

		return promptText;
	};

	// Ejemplo de uso de la función
	const userPrompt = createVisionBoardPrompt(users[0].answers);
	console.log(userPrompt);
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

const saveUserInfoHandler = (socket, io) => {
	return () => {
		// Reemitir el evento a todos los clientes conectados (incluyendo el cliente de TV)
		io.emit('userInfoSaved');
		//SAVE DATA IN DB
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
