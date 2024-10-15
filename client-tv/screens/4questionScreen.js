import { router, socket } from '../routes.js';

export default function render4questionScreen(params) {
	// Función para renderizar las preguntas
	function renderQuestionOnTV(questions) {
		const app = document.getElementById('app');
		app.innerHTML = ''; // Limpiamos la pantalla
		questions.forEach((question) => {
			const questionElement = document.createElement('div');
			questionElement.innerHTML = `
					<h2>${question.question}</h2>
					<div id="optionsContainer"></div>
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
		});
	}

	// Escuchar el evento getQuestions para recibir las preguntas
	socket.on('getQuestions', (questions) => {
		console.log('Recibiendo preguntas...');
		renderQuestionOnTV(questions); // Llamar a la función para renderizar
	});
}
//listen for socket nextQuestion to reload
//listen for socket saveAnswers to change screen.
