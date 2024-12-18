import { router, socket } from '../routes.js';

export default function render4questionScreen() {
	// Función para renderizar una pregunta en la TV
	function renderQuestionOnTV(question) {
		const app = document.getElementById('app');
		app.innerHTML = ''; // Limpiamos la pantalla

		const questionElement = document.createElement('div');
		questionElement.innerHTML = `
		<img class="marco2" src='./assets/MarcoTv.png'>
		<div class="questionscreen">
		<div id="progressbar"></div>
			<h2>${question.question}</h2>
			<div id="optionsContainer"></div>
			</div>
		`;
		app.appendChild(questionElement);

		const optionsContainer = questionElement.querySelector('#optionsContainer');
		question.options.forEach((option) => {
			const optionElement = document.createElement('div');
			optionElement.innerHTML = `
				<p>${option.option}</p>
				<img src="${option.image}" alt="${option.option}" />
			`;
			optionsContainer.appendChild(optionElement);
		});

		const progressbar = questionElement.querySelector('#progressbar');
		progressbar.innerHTML = `
  <img src="${question.progress.image}" alt="progress bar" />
`;
	}

	// Escuchar el evento 'getQuestions' para recibir y renderizar la primera pregunta
	socket.on('getQuestions', (questions) => {
		console.log('Recibiendo preguntas...');
		if (questions.length > 0) {
			renderQuestionOnTV(questions[0]); // Mostrar la primera pregunta
		}
	});

	// Escuchar el evento 'nextQuestion' para recibir la siguiente pregunta
	socket.on('nextQuestion', (question) => {
		console.log('Recibiendo siguiente pregunta en TV:', question);
		renderQuestionOnTV(question); // Renderizar la siguiente pregunta
	});

	// Escuchar el evento 'startWaitingProcess' para cambiar a la pantalla final
	socket.on('startWaitingProcess', () => {
		console.log('Iniciando proceso de espera...');
		router.navigateTo('/screen5'); // Cambiar a screen5
	});

	socket.on('noPresence', () => {
		console.log('goodbye :(');
		router.navigateTo('/'); // Cambiar a la pantalla 1
	});
}
