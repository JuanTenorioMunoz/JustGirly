const db = require("../db");
const { getIO } = require("../socket");

// Controlador para el endpoint /presenceToServer
const presenceToServer = async (req, res) => {
  try {
    // Obtener la instancia de socket.io para emitir el evento
    const io = getIO();

    // Emitir el evento "sensorActivated" a todos los clientes conectados
    io.emit("sensorActivated");

    // Enviar una respuesta al cliente que hizo la petición
    res.status(200).send("Sensor activated, event emitted!");

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    res.status(200).json(db.users);
    /*
    getIO().emit("event1", "message or object"); // if you want emmit an event from endpoint controller
    */
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUsers = async (req, res) => {
  try {
    const { user } = req.body;
    db.users.push(user);
    res.status(200).json(db.users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUsers, createUsers, presenceToServer};
