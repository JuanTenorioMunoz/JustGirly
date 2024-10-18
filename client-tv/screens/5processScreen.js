import { router, socket } from '../routes.js';

export default function render5processScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>¡Ya casi está listo tu Vision Board!</h1>
        <p>Ahora, para recibir y descargar tu Vision Board personalizado déjanos tu correo y adicional te regalamos un descuento exclusivo en productos de Just Girly</p>
<p>Completa los datos en tu celular</p>
        `;

	socket.on('userInfoSaved', () => {
		router.navigateTo('/screen6');
	});
}

//listen for saveUserInfo, if info saved, next screen
