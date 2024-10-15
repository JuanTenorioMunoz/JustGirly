const db = require('../db');
const {
	userConnectedServerHandler,
	startQuestionsHandler,
	nextQuestionHandler,
	saveAnswersHandler,
	startWaitingProcessHandler,
	saveUserInfoHandler,
} = require('../events-handlers/mobileHandlers');

const mobileEvent = (socket, io) => {
	socket.on('userConnectedServer', () => {
		const userId = userConnectedServerHandler(socket, db, io)();
		console.log(`Usuario conectado con ID: ${userId}`);
	});
	socket.on('startQuestions', () => startQuestionsHandler(socket, db, io));
	socket.on('nextQuestion', () => nextQuestionHandler(socket, db, io));
	socket.on('saveAnswers', () => saveAnswersHandler(socket, db, io));
	socket.on('startWaitingProcess', () => startWaitingProcessHandler(socket, db, io));
};

module.exports = { mobileEvent };
