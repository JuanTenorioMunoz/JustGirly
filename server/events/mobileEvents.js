const db = require("../db");
const { userConnectedServerHandler, startQuestionsHandler, nextQuestionHandler, saveAnswersHandler, startWaitingProcessHandler} = require("../events-handlers/mobileHandlers");

const mobileEvent = (socket, io) => {
  socket.on("userConnectedServer", () => userConnectedServerHandler(socket, db, io));
  socket.on("startQuestions", () => startQuestionsHandler(socket, db, io));
  socket.on("nextQuestion", () => nextQuestionHandler(socket, db, io));
  socket.on("saveAnswers", (answer) => saveAnswersHandler(socket, db, io, answer));
  socket.on("startWaitingProcess", () => startWaitingProcessHandler(socket, db, io));
};

module.exports = { mobileEvent };
