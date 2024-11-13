import { router, socket } from '../routes.js';

export default function renderWelcomeScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `

        <div class="welcome">
        <h3>Bienvenidx a</h3>
				<img src="./assets/ManifiestaLogo.png">
        <p id="timer">10</p> <!-- Temporizador visible -->
				</div>

    `;

	// Emitir el evento "userConnectedServer" para crear la entrada en la DB y activar el cambio de pantalla en client-tv
	socket.emit('userConnectedServer');

	// Al cargar la pantalla se inicia el temporizador de 10 segundos
	let timeLeft = 10;
	const timerElement = document.getElementById('timer');
	//actualizar el temporizador cada segundo
	const countdown = setInterval(() => {
		timeLeft -= 1;
		timerElement.textContent = timeLeft;

		// Si el temporizador llega a 0, redirigir a la pantalla 2
		if (timeLeft === 0) {
			clearInterval(countdown);
			router.navigateTo('/2startScreen');
		}
	}, 1000);
}
