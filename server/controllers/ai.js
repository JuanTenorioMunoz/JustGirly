const db = require('../db');
const { getIO } = require('../socket');

const VbToServer = async (req, res) => {
	try {
		const io = getIO();

		io.emit('VBreceived');

		res.status(200).send('Vb sent');
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = { VbToServer };
