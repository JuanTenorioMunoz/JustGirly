const supabase = require('../services/supabase');
const fetch = require('node-fetch');

const { currentsupaurl } = require('../db/index');

const uploadImageFromAI = async (imageUrl, userId) => {
	try {
		// Realiza el fetch de la imagen desde el URL proporcionado
		const response = await fetch(imageUrl);

		if (!response.ok) {
			throw new Error(`Error al obtener la imagen: ${response.statusText}`);
		}

		// Convierte la imagen en un buffer para que pueda ser subida
		const imageBuffer = await response.buffer();

		// Define el nombre del archivo basado en el userId
		const fileName = `images/user_${userId}.png`;

		// Sube la imagen a Supabase
		const { data: uploadData, error: uploadError } = await supabase.storage
			.from('VisionBoards') // Asegúrate de que este bucket sea público
			.upload(fileName, imageBuffer);

		if (uploadError) {
			console.error('Error al subir la imagen a Supabase:', uploadError);
			return null;
		}

		// Genera la URL pública de la imagen
		const { data: publicUrlData, error: publicUrlError } = supabase.storage.from('VisionBoards').getPublicUrl(fileName);

		if (publicUrlError) {
			console.error('Error al obtener la URL pública de la imagen:', publicUrlError);
			return null;
		}

		const publicUrl = publicUrlData.publicUrl;

		// Guarda la URL pública en currentsupaurl usando userId como clave
		currentsupaurl[userId] = publicUrl;
		console.log(`URL pública de la imagen para el usuario ${userId}:`, publicUrl);

		return publicUrl;
	} catch (error) {
		console.error('Error al hacer fetch o al subir la imagen a Supabase:', error);
		return null;
	}
};

module.exports = { uploadImageFromAI };
