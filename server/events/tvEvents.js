const db = require("../db");
const { getVBsHandler, showVBsHandler, getQuestionsHandler} = require("../events-handlers/tvHandlers");

const tvEvent = (socket, io) => {
  socket.on("getQuestions", getQuestionsHandler(socket, db, io));
  socket.on("getVBs", getVBsHandler(socket, db, io));
  socket.on("showVBs", showVBsHandler(socket, db, io));
};

module.exports = { tvEvent };
