import { router, socket } from '../routes.js';

export default function render8sharedVisionBoardsScreen() {
	// Función para renderizar múltiples vision boards
	function renderVBs(users) {
		const app = document.getElementById('app');
		app.innerHTML = `
            <img class="marco2" src='./assets/MarcoTv.png'>
            <div class="sharedscreen">
                <h1>Vision boards de otras Girlys</h1>
                <div class="othergirlys">
                    ${users
											.map(
												(user) => `
                        <img src="${
													user.url ||
													'https://zwpeceuhrpmdsreadcfz.supabase.co/storage/v1/object/public/VisionBoards/images/user_0390f0ab-ab1d-4ce3-945e-41a6b5feb853.png'
												}"
                             alt="Vision board de ${user.name || 'usuario anónimo'}" />
                    `
											)
											.join('')}
                </div>
            </div>
        `;
	}

	// Escuchar el evento 'showVBs' y renderizar los usuarios
	socket.on('showVBs', (randomUsers) => {
		if (randomUsers && randomUsers.length > 0) {
			renderVBs(randomUsers); // Renderiza los usuarios aleatorios
		} else {
			console.error('No se recibieron usuarios aleatorios para mostrar');
		}
	});
}
