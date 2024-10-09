// eventsExampleHandlers.js

const { utilFuntion1, utilFuntion2 } = require("../utils/helpers");

// Assuming db and io are required or passed in some way to be accessible
const userConnectedServerHandler = (socket, db, io) => {
  return () => {};
};

const startQuestionsHandler = (socket, db, io) => {
  return () => {};
};

const nextQuestionHandler = (socket, db, io) => {
  return () => {};
};

const saveAnswersHandler = (socket, db, io) => {
  return () => {};
};
//ENDPOINT

const startWaitingProcessHandler = () => {
  return () => {};
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

};
