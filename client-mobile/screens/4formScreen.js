import { router, socket } from '../routes.js';

const userInfo = {
	name: '',
	email: '',
};

export default function renderFormScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
    <div class="formScreen">
        <h2>Regálanos tus datos para enviarte tu Vision Board</h2>
        <form id="form">
            <div class="inputs">
                <input type="text" id="name" name="name" placeholder="Nombre" required>
                <input type="email" id="email" name="email" placeholder="Correo" required>
            </div>
            <button id="sendButton" disabled>Siguiente</button>
        </form>
    </div>
  `;

	const name = document.getElementById('name');
	const email = document.getElementById('email');
	const sendButton = document.getElementById('sendButton');

	// Función para validar email
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Verificar si ambos campos están completos y el email es válido
	function validateForm() {
		const isNameFilled = name.value.trim().length > 0;
		const isEmailValid = isValidEmail(email.value.trim());
		sendButton.disabled = !(isNameFilled && isEmailValid); // Habilita o deshabilita el botón
	}

	// Escuchar eventos de entrada en los campos
	name.addEventListener('input', validateForm);
	email.addEventListener('input', validateForm);

	sendButton.addEventListener('click', (event) => {
		event.preventDefault(); // Evitar el comportamiento por defecto del formulario

		// Verificar si los campos están completos
		if (sendButton.disabled) {
			alert('Por favor, completa ambos campos correctamente.');
			return; // Evitar que se ejecute la siguiente parte del código si el botón está deshabilitado
		}

		// Guardar los datos del usuario
		userInfo.name = name.value.trim();
		userInfo.email = email.value.trim();

		// Emitir evento para guardar los datos del usuario en el servidor
		socket.emit('saveUserInfo', userInfo);

		// Navegar a la siguiente pantalla
		router.navigateTo('/5linktreeScreen');
	});
}
