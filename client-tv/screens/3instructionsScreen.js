import { router, socket } from '../routes.js';

export default function render3instructionsScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
  <h1>¡Hola, Girly!</h1>
        <p>¡Es hora de proyectarte y crear tu Vision Board perfecto para el 2025! </p>
        <p>En esta actividad súper sencilla y divertida, vas a contestar algunas preguntitas sobre tus metas y sueños, para asi construir juntxs tu mapa y tablero de inspiración que te mantendra enfocadx en cumplir tus propositos y en ser tu mejor versión en el 2025.</p>
        <p>Click en tu celular para continuar</p>
	  <video id="cameraFeed" autoplay playsinline style="width: 100%; height: auto;"></video> <!-- Video de la cámara -->
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

	// Escuchar el evento "displayFirstQuestion" desde el servidor que se debió emitir al clickear en el botón de screen2 de client-mobile
	socket.on('displayFirstQuestion', (firstQuestion) => {
    console.log('Primera pregunta recibida:', firstQuestion);

    // Asegúrate de que se pasa el objeto correctamente
    router.navigateTo('/screen4', { question: firstQuestion });
});
}
