import { router, socket } from '../routes.js';

const userInfo = {
	name: '',
	email: '',
};

export default function renderFormScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Form</h1>
        <p>Dejanos tus datos para enviar tu Vision Board</p>

        <form id:"form">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Enter your full name" required>

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email address" required>

          <button id="sendButton">Send</button>

        </form>
    `;

	document.getElementById('sendButton').addEventListener('click', () => {
		router.navigateTo('/5linktreeScreen');
		socket.emit('saveUserInfo');
	});
}
