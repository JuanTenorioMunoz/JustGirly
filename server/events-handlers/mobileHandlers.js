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

const saveAnswersHandler = (socket, db, io, answer) => {
  console.log("THIS IS" + answer)
};
//ENDPOINT

const startWaitingProcessHandler = () => {
  return () => {
    //CREAR PROMPT, ENVIARLO A VISION AI
    //EMITIR EVENTO PARA CAMBIAR TV SCREEN

    //AWAIT RESPONSE OF PROMPT RESULT AI
    //ALMACENAR EN FIREBASE -> DB (URL) 
    //LISTEN FOR saveUserInfo() 

    //UserExists? No = save Image and imageID
  };
};

const saveUserInfoHandler = () => {
  return () => {
    //SAVE DATA IN DB
    //verificar la ultima imagen guardada en Firebase
    //Relacionar imagen con userID(Firebase?) 

    //AWAIT imageExists? No = Create User and userID
    //else
  };
}

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
