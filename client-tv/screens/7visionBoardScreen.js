import { router, socket } from '../routes.js';

export default function render7visionBoardScreen() {
	function renderVB(imageUrl) {
		const app = document.getElementById('app');
		app.innerHTML = `
        <img class="marco2" src='./assets/MarcoTv.png'>
        <div class="visionscreen">
            <h1>¡Genial, este es tu Vision board!</h1>
            <div class="division">
                <img id="vision-board-img" src="${imageUrl}" alt="Vision board que acaba de crear el usuario" />
                <div class="invitation">
                    <div>
                        <h3>Únete a la dinámica</h3>
                        <p>Si subes tu Vision board a tus historias de Instagram, nos etiquetas y nos sigues en <b>@justgirly.shop</b>, estarás participando del súper sorteo de productos de la tienda.</p>
                    </div>
                    <div>
                        <h3>Recomendación:</h3>
                        <p>Usa tu Vision board de fondo de pantalla para así tener siempre presente tus metas, lo que te ayudará a mantener el enfoque y hacer seguimiento.</p>
                    </div>
                </div>
            </div>
            <p id="timer">300</p>
        </div>
    `;
		socket.emit('sendEmail');
		// Temporizador
		let timeLeft = 30;
		const timerElement = document.getElementById('timer');
		const countdown = setInterval(() => {
			timeLeft -= 1;
			timerElement.textContent = timeLeft;

			if (timeLeft === 0) {
				clearInterval(countdown);
				socket.emit('showVBs');
				router.navigateTo('/screen8');
			}
		}, 1000);
	}
	// Escuchar el evento 'getVBs' del servidor
	socket.on('getVBs', (currentvs) => {
		// Extraer la clave dinámica del objeto
		const dynamicKey = Object.keys(currentvs)[0]; // Extrae la primera clave del objeto
		const imageUrl = currentvs[dynamicKey]?.image_url; // Accede a la URL de la imagen

		if (imageUrl) {
			renderVB(imageUrl); // Llama a la función con la URL de la imagen
		} else {
			console.error('No se encontró la URL de la imagen en los datos recibidos');
		}
	});
}
