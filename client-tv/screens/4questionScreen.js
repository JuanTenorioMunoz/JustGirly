import { router, socket } from '../routes.js';

export default function render4questionScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
   <h1>Primera pregunta</h1>


	`;
}

//listen for socket nextQuestion to reload
//listen for socket saveAnswers to change screen.
