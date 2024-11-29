import { router, socket } from '../routes.js';
import { local } from '../socket.js';

export default function renderLeaveScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `

<div class="backgroundw"></div>
<div class="waiting">
				<img src="${local}/assetsmob/ManifiestaLogo.png">
        <p>Esperamos que vuelvas pronto</p>

				</div>
    `;
}

