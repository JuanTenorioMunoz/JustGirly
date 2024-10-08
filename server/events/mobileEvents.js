const db = require("../db");
const { userConnectedServer, startQuestions, nextQuestion, saveAnswers, startWaitingProcess} = require("../events-handlers/mobileHandlers");

const mobileEvent = (socket, io) => {
  socket.on("userConnectedServer", userConnectedServer(socket, db, io));
  socket.on("startQuestions", startQuestions(socket, db, io));
  socket.on("nextQuestion", nextQuestion(socket, db, io));
  socket.on("saveAnswers", saveAnswers(socket, db, io));
  socket.on("startWaitingProcess", startWaitingProcess(socket, db, io));
};

module.exports = { mobileEvent };
