import { router, socket } from '../routes.js';

export default function renderOptionsScreen() {
	const app = document.getElementById('app');
	let answer = '';
	let questionCounter = 0; // Inicia desde la primera pregunta
	let continueEnable = false;
	let questions = []; // Array para almacenar las preguntas
	let selectedButton = null;

	// Función para renderizar las opciones de la pregunta actual
	function renderCurrentOptions() {
		if (questions.length > 0 && questionCounter < questions.length) {
			const currentQuestion = questions[questionCounter];
			console.log('Pregunta actual:', currentQuestion);

			const buttons = document.querySelectorAll('.option');
			buttons.forEach((button, index) => {
				const option = currentQuestion.options[index]?.option; // Verifica que la opción exista
				if (option) {
					button.textContent = option; // Agrega el texto de la opción al botón
					const img = button.querySelector('img');
					if (img) {
						const imgPath = `http://localhost:5050/assetsmob/${String.fromCharCode(65 + index)}disable.png`;
						img.src = imgPath; // Establece la imagen deshabilitada
						console.log('Ruta de imagen configurada:', imgPath);
					} else {
						console.error(`El botón con ID "${button.id}" no tiene una etiqueta <img>`);
					}
				} else {
					console.error(`No se encontró una opción para el índice ${index}`);
				}
			});
		} else {
			console.log('No hay más preguntas o las preguntas no han sido cargadas.');
		}
	}

	// Renderizar la estructura inicial de la pantalla
	app.innerHTML = `
		<div class="optionsScreen">
			<h1>Responde aquí</h1>
			<div class="orderButtons1">
				<button class="option" id="buttonA"><img src="http://localhost:5050/assetsmob/Adisable.png"></button>
				<button class="option" id="buttonB"><img src="http://localhost:5050/assetsmob/Bdisable.png"></button>
			</div>
			<div class="orderButtons2">
				<button class="option" id="buttonC"><img src="http://localhost:5050/assetsmob/Cdisable.png"></button>
				<button class="option" id="buttonD"><img src="http://localhost:5050/assetsmob/Ddisable.png"></button>
			</div>
			<button id="continueButton" disabled>Continue</button>
		</div>
	`;

	const continueButton = document.getElementById('continueButton');

	// Escuchar el evento 'prepareToStart' para recibir preguntas del servidor
	socket.on('prepareToStart', (receivedQuestions) => {
		questions = receivedQuestions; // Almacena las preguntas recibidas
		renderCurrentOptions(); // Renderiza las opciones de la primera pregunta
		console.log('Preguntas recibidas:', questions);
	});

	// Manejar eventos de clic en los botones de opción
	document.querySelectorAll('.option').forEach((button) => {
		button.addEventListener('click', (event) => {
			// Restablecer imagen del botón seleccionado previamente
			if (selectedButton) {
				const previousImg = selectedButton.querySelector('img');
				if (previousImg) {
					previousImg.src = `http://localhost:5050/assetsmob/${selectedButton.id.charAt(
						selectedButton.id.length - 1
					)}disable.png`;
				}
			}

			// Marcar el botón actual como seleccionado
			selectedButton = button;
			answer = button.id.charAt(button.id.length - 1); // Extrae la respuesta del ID
			const img = button.querySelector('img');
			if (img) {
				img.src = `http://localhost:5050/assetsmob/${answer}-response.png`; // Imagen activada
			}
			continueEnable = true;
			continueButton.disabled = false; // Habilita el botón de continuar
			console.log(`Respuesta seleccionada: ${answer}`);
		});
	});

	// Manejar clic en el botón de continuar
	continueButton.addEventListener('click', () => {
		if (continueEnable) {
			socket.emit('saveAnswers', answer, questionCounter); // Envía la respuesta al servidor
			continueEnable = false;
			continueButton.disabled = true; // Deshabilita el botón de continuar
			questionCounter++; // Incrementa el contador de preguntas

			// Si no hay más preguntas, pasa a la siguiente pantalla
			if (questionCounter >= questions.length) {
				socket.emit('startWaitingProcess'); // Inicia el proceso de espera
				router.navigateTo('/4formScreen'); // Navega a la siguiente pantalla
			} else {
				renderCurrentOptions(); // Renderiza la siguiente pregunta
			}
		}
	});
}
