import { router, socket } from '../routes.js';

export default function renderLeaveScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `

<div class="backgroundw"></div>
<div class="waiting">
				<img class="logo" src="./assets/justGirlyLogo.png">
				<img src="./assets/ManifiestaLogo2.png">
        <p>Polqué te fuiste?? :(</p>
				<img class="girly" src="./assets/Girly.png">

				</div>
    `;
}

