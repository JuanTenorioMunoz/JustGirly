import { router, socket } from '../routes.js';

export default function render6loadingScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Screen 6 loading</h1>
    `;
}

//listen for getVBs, next screen.
//save VBs