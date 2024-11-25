const supabase = require('../services/supabase');
const fetch = require('node-fetch');

const uploadImageFromAI = async (imageUrl, userId) => {
	try {
		// Realiza el fetch de la imagen desde el URL proporcionado
		const response = await fetch(imageUrl);

		if (!response.ok) {
			throw new Error(`Error al obtener la imagen: ${response.statusText}`);
		}

		// Convierte la imagen en un buffer para que pueda ser subida
		const imageBuffer = await response.buffer();

		// Define el nombre del archivo basado en el userId, para asegurarte de que cada imagen tenga un nombre único
		const fileName = `images/user_${userId}.png`;

		// Sube la imagen a Supabase en el bucket especificado
		const { data, error } = await supabase.storage
			.from('VisionBoards') // Reemplaza "bucket_name" con el nombre de tu bucket en Supabase
			.upload(fileName, imageBuffer);

		if (error) {
			console.error('Error al subir la imagen a Supabase:', error);
			return null;
		}

		console.log('Imagen subida exitosamente a Supabase:', data);
		return data;
	} catch (error) {
		console.error('Error al hacer fetch o al subir la imagen a Supabase:', error);
		return null;
	}
};

const getVBsFromSupa = async () => {
	try {
		// Lista todos los archivos en el bucket
		const { data: files, error } = await supabase.storage
			.from('VisionBoards') // Nombre del bucket
			.list('', { limit: 100 }); // Lista hasta 100 archivos (ajusta según tus necesidades)

		if (error) {
			console.error('Error al listar archivos en Supabase:', error);
			return null;
		}

		if (!files || files.length === 0) {
			console.log('No se encontraron archivos en el bucket.');
			return [];
		}

		// Selecciona aleatoriamente 5 archivos
		const selectedFiles = files.sort(() => 0.5 - Math.random()).slice(0, 5);

		// Genera los URLs públicos para los archivos seleccionados
		const urls = selectedFiles.map((file) => {
			return supabase.storage.from('VisionBoards').getPublicUrl(file.name).publicUrl;
		});

		console.log('URLs de Vision Boards seleccionados:', urls);
		return urls;
	} catch (error) {
		console.error('Error al obtener los Vision Boards de Supabase:', error);
		return null;
	}
};

module.exports = { uploadImageFromAI, getVBsFromSupa };
