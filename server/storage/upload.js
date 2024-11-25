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
		// Listar todos los archivos en el bucket y la carpeta 'images'
		const { data: files, error } = await supabase.storage.from('VisionBoards').list('images', { limit: 100 }); // Cambia el límite si tienes más archivos

		if (error) {
			console.error('Error al listar archivos en Supabase:', error);
			return [];
		}

		if (!files || files.length === 0) {
			console.log('No se encontraron archivos en el bucket o en el folder.');
			return [];
		}

		// Mostrar los archivos encontrados (con nombres)
		console.log('Archivos encontrados en Supabase:', files);

		// Generar URLs públicas para todos los archivos
		const urls = files.map((file) => {
			const { data } = supabase.storage.from('VisionBoards').getPublicUrl(`images/${file.name}`);
			return data.publicUrl;
		});

		console.log('Todas las URLs generadas:', urls);

		// Seleccionar 5 URLs al azar
		const randomUrls = [];
		const copyUrls = [...urls]; // Evitar modificar el array original

		while (randomUrls.length < 5 && copyUrls.length > 0) {
			const randomIndex = Math.floor(Math.random() * copyUrls.length);
			randomUrls.push(copyUrls.splice(randomIndex, 1)[0]); // Extraer un URL al azar
		}

		console.log('5 URLs seleccionadas al azar:', randomUrls);
		return randomUrls;
	} catch (error) {
		console.error('Error inesperado en getVBsFromSupa:', error);
		return [];
	}
};

const getVBForUser = async (userId) => {
	try {
		
		if (!userId) {
			console.error('No se encontró un userId para este socket.');
			return null;
		}

		// Construir el path basado en el userId
		const fileName = `images/user_${userId}.png`;

		// Generar la URL pública para la imagen
		const { data, error } = supabase.storage.from('VisionBoards').getPublicUrl(fileName);

		if (error) {
			console.error('Error al generar la URL pública:', error);
			return null;
		}

		console.log('URL pública generada:', data.publicUrl);
		return data.publicUrl;
	} catch (error) {
		console.error('Error inesperado al obtener la URL pública:', error);
		return null;
	}
};

module.exports = { uploadImageFromAI, getVBsFromSupa, getVBForUser };
