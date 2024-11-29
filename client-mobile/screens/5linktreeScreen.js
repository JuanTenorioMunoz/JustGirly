import { router, socket } from '../routes.js';

export default function renderLinktreeScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
	<div class="dinamic">
        <h1>Únete a la dinámica</h1>
        <p class="parrafo">Si subes tu Vision board a tus historias de Instagram, nos etiquetas y nos sigues en <b>@justgirly.shop</b>, estarás participando del super sorteo de productos de la tienda.</p>
				<div class="cta">
       <button id="linkTreeButton0"><img src="./assetsmob/shopping-bag.png">Ver tienda</button>
        <button id="linkTreeButton"><img src="./assetsmob/instagramlogo.png">Ir a instagram</button>
				</div>
				</div>
    `;

	// Agregar eventos a los botones
	document.getElementById('linkTreeButton0').addEventListener('click', () => {
		window.location.href =
			'https://justgirly.my.canva.site/just-girly-shop?fbclid=PAZXh0bgNhZW0CMTEAAaZSjpPM-g5xukmG4plTCBOv71ATXWcW_hZzHxQbgF1Fd5j6iUvAsXYEzF8_aem__S7tV9Sh2efUyz4HIx_Hww';
	});

	document.getElementById('linkTreeButton').addEventListener('click', () => {
		window.location.href = 'https://www.instagram.com/justgirly.shop/?locale=zh_tw&hl=am-et';
		socket.emit('event2');
	});

	socket.on('noPresence', () => {
		console.log('goodbye :(');
		router.navigateTo('/');
	});
}
