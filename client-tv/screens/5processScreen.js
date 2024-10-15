import { router, socket } from '../routes.js';

export default function render5processScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Screen 5 tv process Screen</h1>
    `;
}

//listen for saveUserInfo, if info saved, next screen
