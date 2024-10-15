import { router, socket } from '../routes.js';

export default function render8sharedVisionBoardsScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Screen 8</h1>
    `;
}
//show VBs
//wait 30 second and go back to 1st screen