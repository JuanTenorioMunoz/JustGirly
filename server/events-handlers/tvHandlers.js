// eventsExampleHandlers.js

const { utilFuntion1, utilFuntion2 } = require("../utils/helpers");


const getQuestionsHandler = (socket, db, io) => {
  return () => {
    const questions = db.questions; // Obtener las preguntas de la base de datos
    socket.emit("getQuestions", questions); // Enviar preguntas al cliente
    console.log("Preguntas enviadas al cliente TV:", questions);
  };
};

const getVBsHandler = (socket, db, io) => {
  return () => {};
};

const showVBsHandler = (socket, db, io) => {
  return () => {};
};

const changeScreenHandler = () => {
  return () => {};
};

module.exports = {
  changeScreenHandler,
  getVBsHandler,
  showVBsHandler,
  getQuestionsHandler,
};
