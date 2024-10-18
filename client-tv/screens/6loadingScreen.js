import { router, socket } from '../routes.js';

export default function render6loadingScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h2>Productos de decoración hogar, skincare, maquillaje, accesorios y mucho más</h2>
        <h1>Estamos creando tu vision board, esperanos tantito...</h1>
    `;

    socket.on('VBreceived', () => {
		router.navigateTo('/screen7'); // Cambiar a la pantalla 2 automáticamente
	});
}

//listen for getVBs, next screen.
//save VBs