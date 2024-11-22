import { router, socket } from '../routes.js';

export default function renderOptionsScreen() {
	const app = document.getElementById('app');
	let answer = '';
	let questionCounter = 0; // Cambiado a 0 para empezar desde la primera pregunta
	let continueEnable = false;
	let questions = []; // Almacenamos las preguntas aquí
	let selectedButton = null;

	// Función para renderizar las opciones de la pregunta actual
	function renderCurrentOptions() {
		if (questions.length > 0 && questionCounter < questions.length) {
			const currentQuestion = questions[questionCounter];
			console.log('current' + currentQuestion);

			const buttons = document.querySelectorAll('.option');
			buttons.forEach((button, index) => {
				button.textContent = currentQuestion.options[index].option;
				const img = button.querySelector('img');
				img.src = `./assets/${String.fromCharCode(65 + index)}-disable.png`; // Set the default image
			});
			// Renderizamos las opciones en los botones A, B, C y D
			// document.querySelector('.option#buttonA').textContent = currentQuestion.options[0].option;
			// document.querySelector('.option#buttonB').textContent = currentQuestion.options[1].option;
			// document.querySelector('.option#buttonC').textContent = currentQuestion.options[2].option;
			// document.querySelector('.option#buttonD').textContent = currentQuestion.options[3].option;

			// Guardar los valores en atributos de los botones para su uso posterior
			document.querySelector('.option#buttonA').dataset.value = currentQuestion.options[0].option;
			document.querySelector('.option#buttonB').dataset.value = currentQuestion.options[1].option;
			document.querySelector('.option#buttonC').dataset.value = currentQuestion.options[2].option;
			document.querySelector('.option#buttonD').dataset.value = currentQuestion.options[3].option;

			// const buttons = document.querySelectorAll('.option');
			// buttons.forEach((button, index) => {
			// 	button.textContent = options[index].option;
			// 	button.querySelector('img').src = `./assets/${String.fromCharCode(65 + index)}-response.png`;
			// });

			console.log(`Pregunta ${questionCounter + 1}: ${currentQuestion.question}`); // Muestra la pregunta actual
		} else {
			console.log('No hay más preguntas o las preguntas no han sido cargadas.');
		}
	}

	// Inicializar la pantalla y establecer la interfaz de usuario
	app.innerHTML = `

	<div class="optionsScreen">
		<h1>Responde aquí</h1>

		<div class="orderButtons1">
		<button class="option" id="buttonA"><img src="./assets/A-disable.png"> </button>
		<button class="option" id="buttonB"><img src="./assets/B-disable.png"></button>
		</div>

		<div class="orderButtons2">
		<button class="option" id="buttonC"><img src="./assets/C-disable.png"></button>
		<button class="option" id="buttonD"><img src="./assets/D-disable.png"></button>
		</div>

		<button id="continueButton" disabled>Continue</button>
		</div>
	`;

	const continueButton = document.getElementById('continueButton');

	// Escuchar el evento 'prepareToStart' para recibir las preguntas
	socket.on('prepareToStart', (receivedQuestions) => {
		questions = receivedQuestions; // Guardar las preguntas en el array
		renderCurrentOptions(); // Renderizar opciones de la primera pregunta
		console.log('Preguntas recibidas y renderizadas en OptionsScreen:', questions);
	});

	document.querySelectorAll('.option').forEach((button) => {
		button.addEventListener('click', (event) => {
			answer = '';
			answer = event.currentTarget.dataset.value; // Guardar la respuesta seleccionada
			console.log(`answer: ${answer}`);
			// Si ya hay un botón seleccionado, restablece su imagen a "deshabilitada"
			if (selectedButton) {
				selectedButton.querySelector('img').src = `./assets/${selectedButton.id.charAt(
					selectedButton.id.length - 1
				)}-disable.png`;
			}

			// Actualiza la imagen del botón actual a la versión "activa"
			selectedButton = button; // Guarda el botón actualmente seleccionado
			answer = button.id.charAt(button.id.length - 1); // Guarda la respuesta
			continueEnable = true;
			continueButton.disabled = false;
			button.querySelector('img').src = `./assets/${answer}-response.png`; // Cambia a la imagen activa
		});
	});

	// // Manejar la selección de una opción
	// document.querySelectorAll('.option').forEach((button) => {
	// 	button.addEventListener('click', (event) => {
	// 		answer = '';
	// 		answer = event.target.value; // Guardar la respuesta seleccionada
	// 		console.log(`answer: ${answer}`);
	// 		continueEnable = true;
	// 		continueButton.disabled = false; // Habilitar el botón de continuar

	// 		const img = button.querySelector('img');
	// 		img.src = `./assets/${button.id.charAt(button.id.length - 1)}-response.png`;
	// 	});
	// });

	// Manejar el clic en el botón de continuar
	continueButton.addEventListener('click', () => {
		if (continueEnable) {
			// Emitir la respuesta junto con el número de la pregunta
			socket.emit('saveAnswers', answer, questionCounter);
			continueEnable = false;
			continueButton.disabled = true; // Deshabilitar el botón de continuar
			questionCounter++; // Incrementar el contador de preguntas

			// Si se llega a la última pregunta, iniciar el proceso de espera
			if (questionCounter >= questions.length) {
				socket.emit('startWaitingProcess'); // Emitir evento de inicio de espera
				router.navigateTo('/4formScreen');
			} else {
				renderCurrentOptions(); // Renderizar las opciones de la siguiente pregunta
			}
		}
	});
}


