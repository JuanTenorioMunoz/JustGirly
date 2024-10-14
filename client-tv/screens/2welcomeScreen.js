import { router, socket } from '../routes.js';

export default function render2welcomeScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
	<p>qr</p>
        <p>Para iniciar la experiencia correctamente, con tu celular lee este codigo QR</p>
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
}
