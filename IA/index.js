const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
	apiKey: 'sk-xB8rSieYLcEdFF5gy2iq_kGV1eq24uhRLj3yyXBJqUT3BlbkFJIYDw3qR3b_t6SxnKCi0CW5u79-htAvxNgxS-N204QA',
});

const app = express();
app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips

// Chat completion endpoint: https://platform.openai.com/docs/guides/chat-completions/chat-completions
app.post('/chat-completion', async (req, res) => {
	try {
		const { messages } = req.body;
		const response = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: messages,
		});

		res.json(response);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Image generation endpoint: https://platform.openai.com/docs/guides/images/image-generation
app.post('/generate-image', async (req, res) => {
	try {
		const response = await openai.images.generate({
			model: 'dall-e-3',
			prompt:
				' Create a vision board for a woman with aspirations for the year 2025. The vision board should have a cohesive, realistic photographic style, with images overlapping and pinned to the board. The background of the board should always be #E3D5CA, and the frame should always be wood, tightly aligned with the border of the vision board without showing any walls. Include specific photos, limited to three images per aspiration, related to the users selections:1. For her mindset and personal growth in 2025, focus on images that represent: constant learning and improvement, with images like an open book, a staircase symbolizing progress, or a tree growing.2. For the habit she would like to incorporate into her daily routine, use images that reflect: regular exercise, such as a person jogging, a set of gym weights, or a yoga mat. 3. For the affirmation that resonates for her best version in 2025, focus on images that evoke: balance and constant growth, with images like a scale balancing perfectly, a plant growing, or a peaceful beach at sunset. 4. For her dream vacation in 2025, choose images that showcase: a beach destination, with golden sands, turquoise waters, and palm trees swaying in the breeze. 5. For the color that represents her energy in 2025, include imagery featuring: blue, symbolizing peace and clarity, with clear blue skies, calm oceans, or blue crystals. 6. For her primary goal in 2025, focus on images that depict: achieving a major professional goal, with images of a businesswoman in a boardroom, a career milestone celebration, or a completed project. 7. For the aspect of her life she wants to simplify in 2025, highlight images of: organized physical spaces, with neat desks, decluttered rooms, or labeled storage bins. 9. For her main financial focus in 2025, highlight images that showcase: saving and managing finances, with a piggy bank, a bank statement, or a person budgeting.10. For the feelings she wants to experience most in 2025, focus on images that evoke: motivation and empowerment, featuring a strong woman flexing, a victory pose, or a group of people cheering each other on.',
			n: 1,
			size: '1024x1024',
		});

		const image_url = response.data[0].url;

		res.json(image_url);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// // Función para generar el prompt dinámico concatenando respuestas de usuario
// function createVisionBoardPrompt(answers) {
//   const fixedPrompt = `Create a vision board for a girl with these aspirations:\n`;

//   // Añadimos cada respuesta del usuario al prompt
//   const userAspirations = answers.map((answer, index) => `A. ${answer}`).join("\n");

//   // Prompt con los detalles visuales y estéticos
//   const visualDetails = `
//   The vision board should have a cohesive, realistic photographic style, with images overlapping and pinned to the board. The background of the board should always be #E3D5CA, and the frame should always be wood, tightly aligned with the border of the vision board without showing any walls. Include specific photos, limited to three images per aspiration. Do not include any text on the images. Focus solely on objects, places, and symbols that represent these goals. The overall layout should mimic a real-life vision board. Use close-up shots of objects and landscapes to avoid any depiction of faces or people, ensuring that all images are directly related to the specified themes and goals.`;

//   // Concatenamos el prompt final con las respuestas del usuario
//   const fullPrompt = fixedPrompt + userAspirations + visualDetails;

//   return fullPrompt;
// }

app.listen(3000, () => {
	console.log(`Server is running on http://localhost:${3000}`);
});

// app.post('/generate-image', async (req, res) => {
//   try {
//     // Recibe las respuestas del frontend
//     const { location, skills, goal } = req.body;

//     // Construir el prompt usando las respuestas del usuario
//     const prompt = `A vision board that shows a person living in ${location}, developing skills in ${skills}, and with a primary goal of ${goal}. The board should have inspiring visuals, motivational quotes, and depict a successful future for this person.`;

//     // Llama a la API de DALL·E para generar la imagen
//     const response = await openai.images.generate({
//       model: "dall-e-3",
//       prompt: prompt,  // Usa el prompt que creaste
//       n: 1,
//       size: "1080x1920",  // Tamaño de la imagen
//     });

//     const image_url = response.data[0].url;

//     // Devuelve la URL de la imagen generada al frontend
//     res.json(image_url);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
