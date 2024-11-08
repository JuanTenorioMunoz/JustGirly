import { router, socket } from '../routes.js';

export default function renderLinktreeScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Únete a la dinámica</h1>
        <p>Si subes tu Vision board a tus historias de Instagram, nos etiquetas y nos sigues en <b>@justgirly.shop</b>, estarás participando del super sorteo de productos de la tienda.</p>
       <button id="linkTreeButton0">Ver tienda</button>
        <button id="linkTreeButton">Ir a instagram</button>
    `;

	// Agregar eventos a los botones
	document.getElementById('linkTreeButton0').addEventListener('click', () => {
		window.location.href = 'https://beacons.ai/justgirly.shop';
	});

	document.getElementById('linkTreeButton').addEventListener('click', () => {
		window.location.href = 'https://www.instagram.com/justgirly.shop/?locale=zh_tw&hl=am-et';
		socket.emit('event2');
	});
}

//IDK
//TEST
