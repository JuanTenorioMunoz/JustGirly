import { router, socket } from '../routes.js';

export default function renderStartScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `

        <button id="goToScreen3"> <h1>Click aquí</h1>
        <p>para continuar</p></button>
    `;

	document.getElementById('goToScreen3').addEventListener('click', () => {
		router.navigateTo('/3optionsScreen');
		socket.emit('startQuestions');
    //para verificar que el evento si se emita
    console.log('Evento startQuestions emitido desde client-mobile');
	});
}
