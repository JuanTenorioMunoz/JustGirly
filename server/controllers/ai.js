const db = require('../db');
const { getIO } = require('../socket');

// Controlador para el endpoint /presenceToServer
const VbToServer = async (req, res) => {
	try {
		// Obtener la instancia de socket.io para emitir el evento
		const io = getIO();

		// Emitir el evento "sensorActivated" a todos los clientes conectados
		io.emit('VBreceived');

		// Enviar una respuesta al cliente que hizo la petición
		res.status(200).send('Vb sent');
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = { VbToServer };
