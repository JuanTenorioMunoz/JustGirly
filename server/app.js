// este archivo es para definir endpoints
const userController = require('./controllers/users');
const express = require('express');
const cors = require('cors');
//IA
const OpenAI = require('openai');
const fs = require('fs');


const app = express(); // Creates HTTP server
app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips

const path = require('path');

const clientTvPath = path.resolve(__dirname, '../client-tv');
const clientMobilePath = path.resolve(__dirname, '../client-mobile');
const assetsPath = path.resolve(__dirname, '../server/assets');

app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// Serve Client App 1
app.use('/tv', express.static(clientTvPath));

// Serve Client App 2
app.use('/mobile', express.static(clientMobilePath));

app.use('/assets', express.static(assetsPath));

// Catch-all route for Client App 1
app.get('/tv/*', (req, res) => {
	res.sendFile(path.join(clientTvPath, 'index.html'));
});

// Catch-all route for Client App 2
app.get('/mobile/*', (req, res) => {
	res.sendFile(path.join(clientMobilePath, 'index.html'));
});

const usersRouter = require('./routes/users');

app.use('/', usersRouter);

// simulacion del arduino
//app.get('/presenceToServer', userController.presenceToServer);//

app.post('/activate-sensor', userController.presenceToServer);
module.exports = app;

//IA
const openai = new OpenAI({
	apiKey: '',
});

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
		if (!currentPrompt.prompt) {
			return res.status(400).json({ error: 'No hay un prompt disponible en currentPrompt.' });
		}

		const response = await openai.images.generate({
			model: 'dall-e-3',
			prompt: currentPrompt.prompt,
			n: 1,
			size: '1024x1024',
		});

		const image_url = response.data[0].url;
		res.json({ image_url });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});



/*
const usersRouter = require("./routes/users")

app.use("/", usersRouter)
//son endpoints, se controlan con los controladores en lugar de los handlers
//son requests
module.exports = app

*/
