// eventsExampleHandlers.js

const { utilFuntion1, utilFuntion2 } = require("../utils/helpers");

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
};
