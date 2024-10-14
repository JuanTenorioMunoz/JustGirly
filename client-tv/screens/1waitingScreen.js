import { router, socket } from '../routes.js';
//import socket from '../socket.js';
//import prueba from '../routes.js';

console.log(prueba);

export default function render1waitingScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Screen 1</h1>
        <p>This is the waiting screen</p>
        <button id="emitButton">Emit Event</button>
        <button id="goToScreen2">Go to Screen 2</button>
    `;

	// Botón para emitir un evento manualmente desde el cliente (para pruebas)
	document.getElementById('emitButton').addEventListener('click', () => {
		console.log('emited');
		socket.emit('event1', { message: 'Hello from About page' });
	});

	// Botón para cambiar manualmente a la segunda screen (para pruebas)
	document.getElementById('goToScreen2').addEventListener('click', () => {
		router.navigateTo('/screen2');
	});

	// Escuchar el evento "sensorActivated" desde el servidor
	socket.on('sensorActivated', () => {
		console.log('sensorActivated event received, navigating to screen 2');
		// Cambiar a la segunda screen automáticamente cuando el evento se reciba
		router.navigateTo('/screen2');
	});
}

//listen for presenceToServer arduino event que deberia ser un endpoint
// cambia de screen
