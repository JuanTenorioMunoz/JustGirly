import { router, socket } from '../routes.js';

export default function render1waitingScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `

<div class="backgroundw"></div>
<div class="waiting">
				<img class="logo" src="./assets/justGirlyLogo.png">
				<img src="./assets/ManifiestaLogo2.png">
        <p>Acércate y crea tu propio Vision board para proyectar tu mejor versión en el 2025</p>
				<img class="girly" src="./assets/Girly.png">

				</div>
    `;

	// Escuchar el evento "sensorActivated" desde el servidor
	socket.on('sensorActivated', () => {
		console.log('Evento sensorActivated recibido, cambiando a la pantalla 2');
		router.navigateTo('/screen2'); // Cambiar a la pantalla 2 automáticamente
	});
}

//listen for presenceToServer endpoint
// cambia de screen a 2welcomeScreen.
