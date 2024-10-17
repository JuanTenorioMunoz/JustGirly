import { router, socket } from '../routes.js';

export default function renderOptionsScreen() {
	const app = document.getElementById('app');
	let answer = '';
	let questionCounter = 0; 
	let continueEnable = false;
	let questions = []; 


	function renderCurrentOptions() {
		if (questions.length > 0 && questionCounter < questions.length) {
			const currentQuestion = questions[questionCounter];
			console.log("current" + currentQuestion)

			document.querySelector('.option#buttonA').textContent = currentQuestion.options[0].option;
			document.querySelector('.option#buttonB').textContent = currentQuestion.options[1].option;
			document.querySelector('.option#buttonC').textContent = currentQuestion.options[2].option;
			document.querySelector('.option#buttonD').textContent = currentQuestion.options[3].option;


			document.querySelector('.option#buttonA').value = currentQuestion.options[0].option;
			document.querySelector('.option#buttonB').value = currentQuestion.options[1].option;
			document.querySelector('.option#buttonC').value = currentQuestion.options[2].option;
			document.querySelector('.option#buttonD').value = currentQuestion.options[3].option;

			console.log(`Pregunta ${questionCounter + 1}: ${currentQuestion.question}`); 
		} else {
			console.log('No hay más preguntas o las preguntas no han sido cargadas.');
		}
	}


	app.innerHTML = `
		<h1>OptionsScreen</h1>
		<p>Responde aquí</p>
		<button class="option" id="buttonA"></button>
		<button class="option" id="buttonB"></button>
		<button class="option" id="buttonC"></button>
		<button class="option" id="buttonD"></button>
		<button id="continueButton" disabled>Continue</button>
	`;

	const continueButton = document.getElementById('continueButton');


	socket.on('prepareToStart', (receivedQuestions) => {
		questions = receivedQuestions; 
		renderCurrentOptions();
		console.log('Preguntas recibidas y renderizadas en OptionsScreen:', questions);
	});

	document.querySelectorAll('.option').forEach((button) => {
		button.addEventListener('click', (event) => {
			answer = ""
			answer = event.target.value; 
			console.log(`answer: ${answer}`);
			continueEnable = true;
			continueButton.disabled = false; 
		});
	});


	continueButton.addEventListener('click', () => {
		if (continueEnable) {

			
			continueEnable = false;
			continueButton.disabled = true; 
			questionCounter++; 
			socket.emit('saveAnswers', answer, questionCounter);
			renderCurrentOptions(); 

			if (questionCounter >= questions.length) {
				socket.emit('startWaitingProcess'); 
				router.navigateTo('/4formScreen');
			} 
		}
	});
}
