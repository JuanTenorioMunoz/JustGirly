const { arduinoEvent} = require("./arduinoEvents")
const { mobileEvent} = require("./mobileEvents")
const { tvEvent} = require("./tvEvents")


const handleEvents = (socket, io) => {
  arduinoEvent(socket, io);
  mobileEvent(socket, io);
  tvEvent(socket, io);
}

module.exports = { handleEvents }
