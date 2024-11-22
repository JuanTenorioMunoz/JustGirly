import { router, socket } from '../routes.js';

export default function render6loadingScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `

      <div id="loadingscreen">
        <img class="textgirly" src='./assets/TextLoading.png'>
        <img  class="loaderimg" src='./assets/loader.png'>
        <p>Estamos creando tu vision board, esperanos tantito...</p>
        </div>
    `;

	socket.on('VBreceived', () => {
		router.navigateTo('/screen7'); // Cambiar a la pantalla 2 automáticamente
	});
}

//listen for getVBs, next screen.
//save VBs
