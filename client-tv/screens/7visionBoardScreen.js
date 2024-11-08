import { router, socket } from '../routes.js';

export default function render7visionBoardScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>¡Genial, este es tu Vision board!</h1>
        <img src="" alt="Vision board que acaba de crear el usuario" />
        <div><h3>Únete a la dinámica</h3>
        <p>Si subes tu Vision board a tus historias de Instagram, nos etiquetas y nos sigues en <b> @justgirly.shop</b>, estarás participando del super sorteo de productos de la tienda.</p></div>
    <div> <h3>Recomendación:</h3>
    <p>Usa tu Vision board de fondo de pantalla para asi tener siempre presente tus metas, lo que te ayudara a mantener el enfoque y hacer seguimiento.</p></div>
   <p id="timer">30</p> <!-- Temporizador visible -->
    `;

	let timeLeft = 30;
	const timerElement = document.getElementById('timer');
	const countdown = setInterval(() => {
		timeLeft -= 1;
		timerElement.textContent = timeLeft;

		if (timeLeft === 0) {
			clearInterval(countdown);
			router.navigateTo('/screen8');
		}
	}, 1000);
}

//render VB
//showVBs to show VB

//set timer 30 seconds or until other VBs are available.
