const db = require('../db');
const {
	userConnectedServerHandler,
	startQuestionsHandler,
	nextQuestionHandler,
	saveAnswersHandler,
	saveUserInfoHandler,
} = require('../events-handlers/mobileHandlers');

const mobileEvent = (socket, io) => {

	socket.on('userConnectedServer', () => {
		const userId = userConnectedServerHandler(socket, db, io)();
		console.log(`Usuario conectado con ID: ${userId}`);
	});

	socket.on('startQuestions', () => {
		console.log('startQuestionsHandler se está llamando');
		startQuestionsHandler(socket, db, io)();
	});

	socket.on('nextQuestion', () => nextQuestionHandler(socket, db, io));
	socket.on("saveAnswers", saveAnswersHandler(socket, db, io));
	socket.on('saveUserInfo', saveUserInfoHandler(socket, db, io)
	);
};

module.exports = { mobileEvent };
