import { router, socket } from '../routes.js';

export default function render4questionScreen(params = {}) {
	console.log('Params recibidos en screen4:', params); // Para ver lo que se está recibiendo

	const app = document.getElementById('app');

	// Asegúrate de que params.questionData existe
	if (!params.questionData || !params.questionData.question) {
		app.innerHTML = `<h3>Pregunta no disponible</h3>`;
		return;
	}

	// Obtener los datos de la pregunta
	const { question, options } = params.questionData;

	// Renderizar la pregunta en la pantalla
	app.innerHTML = `
			<h3>${question}</h3>
			<div id="options-container">
					${options
						.map(
							(option) => `
							<div class="option">
									<p>${option.option}</p>
									<img src="${option.image}" alt="${option.option}">
							</div>
					`
						)
						.join('')}
			</div>
	`;
}

//listen for socket nextQuestion to reload
//listen for socket saveAnswers to change screen.
