import { router, socket } from '../routes.js';

export default function render3instructionsScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `

	<div class="video-container">
  <img class="marco" src='./assets/MarcoTv.png'>
 <h1 class="saludo" >¡Hola, Girly!</h1>
  <div class="instructions-container">
    <img src='./assets/instructions.png'>
  </div>

	  <video id="cameraFeed" autoplay playsinline ></video> <!-- Video de la cámara -->
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

	socket.on('prepareToStart', () => {
		console.log('Preparándose para comenzar...');
		socket.emit('getQuestions'); // Emitir evento para solicitar preguntas
		router.navigateTo('/screen4');
	});
}
