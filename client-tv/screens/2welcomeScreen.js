import { router, socket } from '../routes.js';

export default function render2welcomeScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
	<p>qr</p>
        <p>Para iniciar la experiencia correctamente, con tu celular lee este codigo QR</p>

    `;

	async function requestListOfUsers() {
		try {
			const url = 'http://localhost:5050/users';
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();

			return data;
		} catch (error) {
			console.error('Fetch error:', error);
		}
	}

	document.getElementById('requestButton').addEventListener('click', async () => {
		const listUsers = await requestListOfUsers();
		console.log(listUsers);
	});

	document.getElementById('goToScreen1').addEventListener('click', () => {
		router.navigateTo('/');
		socket.emit('event2');
	});

	document.getElementById('goToScreen3').addEventListener('click', () => {
		router.navigateTo('/screen3');
	});
}

//activa la camara
//listen for mobile event socket userConnectedServe
//next screen
