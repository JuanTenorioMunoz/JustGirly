// eventsExampleHandlers.js
const {finalScreen} = require("../db/index")
const { utilFuntion1, utilFuntion2 } = require("../utils/helpers");
// Assuming db and io are required or passed in some way to be accessible
const presenceToServerHandler = (socket, db, io) => {
  return () => {};
};

const setFinalScreenHandler = (socket, db, io) => {
  return () => {
    console.log("llamaaaaaaaaaa")
    console.log("FINELR", finalScreen)
    if (finalScreen.status == 0){
      finalScreen.status = 1
      console.log("this is", finalScreen.status)
    } 
  };
}

const removeFinalScreenHandler = (socket, db, io) => {
  return () => {
    console.log("llamaaaaaaaaaa")
    console.log("FINELR", finalScreen)
    if (finalScreen.status == 1){
      finalScreen.status = 0
      console.log("this is", finalScreen.status)
    } 
  };
}



module.exports = {
  presenceToServerHandler,
  setFinalScreenHandler,
  removeFinalScreenHandler,
};
