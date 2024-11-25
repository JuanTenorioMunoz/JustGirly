import { router, socket } from '../routes.js';

export default function render5processScreen() {
	let vbReceived = false;
	const app = document.getElementById('app');
	app.innerHTML = `
	<img class="marco2" src='./assets/MarcoTv.png'>
<div class="process">
        <h1>¡Ya casi está listo tu Vision Board!</h1>
        <p>Ahora, para recibir y descargar tu Vision Board personalizado déjanos tu correo y adicional te regalamos un <strong> descuento exclusivo en productos de Just Girly</strong></p>
<p>Completa los datos en tu celular</p>
</div>
        `;

	// Escuchar el evento 'VBreceived'
	socket.on('VBreceived', () => {
		vbReceived = true; // Marca que ya se escuchó el evento
	});

	// Escuchar el evento 'userInfoSaved'
	socket.on('userInfoSaved', () => {
		if (vbReceived) {
			socket.emit('getVBs');
			router.navigateTo('/screen7'); // Si ya se recibió `VBreceived`, ir directamente a la pantalla 7
		} else {
			socket.emit('showVBs');
			router.navigateTo('/screen8'); // Si no, ir a la pantalla 6
		}
	});
}
