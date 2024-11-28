const db = require("../db");
const { getIO } = require("../socket");

// Controlador para el endpoint /presenceToServer
const presenceToServer = async (req, res) => {
  try {
    // Obtener la instancia de socket.io para emitir el evento
    const io = getIO();

    // Emitir el evento "sensorActivated" a todos los clientes conectados
    io.emit("sensorActivated");

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const absenceToServer = async (req, res) => {
  try {
    // Obtener la instancia de socket.io para emitir el evento
    const io = getIO();

    // Emitir el evento "sensorActivated" a todos los clientes conectados
    io.emit("noPresence");

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {presenceToServer, absenceToServer};
