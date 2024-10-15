import { router, socket } from '../routes.js';

export default function renderOptionsScreen() {
	const app = document.getElementById('app');
	let answer = '';
	let questionCounter = 1; // Controlamos el número de la pregunta
	let continueEnable = 0;

	app.innerHTML = `
		<h1>OptionsScreen</h1>
		<p>Responde aquí</p>

		<button class="option" id="buttonA">A</button>
		<button class="option" id="buttonB">B</button>
		<button class="option" id="buttonC">C</button>
		<button class="option" id="buttonD">D</button>

		<button id="continueButton" disabled>Continue</button>
	`;

	const continueButton = document.getElementById('continueButton');

	document.querySelectorAll('.option').forEach((button) => {
		button.addEventListener('click', (event) => {
			answer = event.target.textContent;
			console.log(`answer: ${answer}`);
			continueEnable = 1;
			continueButton.disabled = false;
		});
	});

	continueButton.addEventListener('click', () => {
		if (continueEnable === 1) {
			// Emitimos la respuesta junto con el número de la pregunta
			socket.emit('saveAnswers', answer, questionCounter);
			continueEnable = 0;
			continueButton.disabled = true;
			questionCounter++;

			if (questionCounter > 10) {
				socket.emit('startWaitingProcess'); // Última pregunta, inicia el proceso de espera
			}
		}
	});
}
