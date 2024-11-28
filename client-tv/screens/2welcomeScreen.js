import { router, socket } from '../routes.js';

export default function render2welcomeScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `

	<div class="video-container">
  <img class="marco" src='./assets/MarcoTv.png'>
  <div class="qr-container">
    <img src='./assets/QR.png'>
  </div>
  <video id="cameraFeed" autoplay playsinline></video>
</div>

    `;

	// Función para encender la cámara
	const startCamera = async () => {
		try {
			// Acceder al stream de video de la cámara
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			const videoElement = document.getElementById('cameraFeed');
			videoElement.srcObject = stream;
		} catch (err) {
			console.error('Error al acceder a la cámara: ', err);
			app.innerHTML += `<p>Error al acceder a la cámara: ${err.message}</p>`;
		}
	};

	// Llamar a la función para iniciar la cámara cuando llegamos a esta pantalla
	startCamera();

	// Escuchar el evento "newUserConnected" desde el servidor ( que se debió emitir cuando alguien entra a screen1 de client-mobile)
	//cambiar de pantalla
	socket.on('newUserConnected', (userId) => {
		console.log(`Nuevo usuario conectado: ${userId}, cambiando a la pantalla 3`);
		router.navigateTo('/screen3');
	});

	socket.on('noPresence', () => {
		console.log('goodbye :(');
		router.navigateTo('/'); // Cambiar a la pantalla 1
	});
}
