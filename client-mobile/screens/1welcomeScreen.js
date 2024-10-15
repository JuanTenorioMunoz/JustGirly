import { router, socket } from '../routes.js';

export default function renderWelcomeScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Welcome Screen</h1>
        <p>glow up pls</p>
        <button id="goToScreen2">Go to Screen 2</button>
    `;

	document.getElementById('goToScreen2').addEventListener('click', () => {
		router.navigateTo('/2startScreen');
	});
	// Emitir el evento "userConnectedServer" cuando el usuario llegue a esta pantalla para que la screen 2 de client-tv cambie a 3 y se cree el entry en la db
	socket.emit('userConnectedServer');
}

//TIMER RUN OUT 10 SECS -> NEXT SCREEN
