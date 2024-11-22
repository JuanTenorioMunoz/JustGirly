import { router, socket } from '../routes.js';

export default function render5processScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
	<img class="marco2" src='./assets/MarcoTv.png'>
<div class="process">
        <h1>¡Ya casi está listo tu Vision Board!</h1>
        <p>Ahora, para recibir y descargar tu Vision Board personalizado déjanos tu correo y adicional te regalamos un <strong> descuento exclusivo en productos de Just Girly</strong></p>
<p>Completa los datos en tu celular</p>
</div>
        `;

	socket.on('userInfoSaved', () => {
		router.navigateTo('/screen6');
	});
}

//listen for saveUserInfo, if info saved, next screen
