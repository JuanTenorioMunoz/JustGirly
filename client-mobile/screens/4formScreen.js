import { router, socket } from '../routes.js';

const userInfo = {
	name: '',
	email: '',
};

export default function renderFormScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `

				<div class="formScreen">
        <h3>Regalanos tus datos para enviarte tu Vision Board a tu correo</h3>


        <form id:"form">
				<div class="inputs">
          <input type="text" id="name" name="name" placeholder="Nombre" required>
          <input type="email" id="email" name="email" placeholder="Correo" required>
					</div>
          <button id="sendButton">Siguiente</button>

        </form>
				</div>
    `;

	const name = document.getElementById('name');
	let nameInput = '';
	name.addEventListener('input', (event) => {
		nameInput = event.target.value;
		console.log(nameInput);
	});

	const email = document.getElementById('email');
	let emailInput = '';
	email.addEventListener('input', (event) => {
		emailInput = event.target.value;
		console.log(emailInput);
	});

	document.getElementById('sendButton').addEventListener('click', (event) => {
		event.preventDefault(); // Evitar el comportamiento por defecto del formulario
		router.navigateTo('/5linktreeScreen');

		socket.emit('saveUserInfo', nameInput, emailInput); // Solo emitimos el evento al servidor
	});
}
