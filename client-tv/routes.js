import render1waitingScreen from './screens/1waitingScreen.js';
import render2welcomeScreen from './screens/2welcomeScreen.js';
import render3instructionsScreen from './screens/3instructionsScreen.js';
import render4questionScreen from './screens/4questionScreen.js';
import render5processScreen from './screens/5processScreen.js';
import render6loadingScreen from './screens/6loadingScreen.js';
import render7visionBoardScreen from './screens/7visionBoardScreen.js';
import render8sharedVisionBoardsScreen from './screens/8sharedVisionBoards.js';
import socket from './socket.js';

const router = new Router({
	// check this for more features with Router: https://github.com/Graidenix/vanilla-router
	mode: 'hash',
	page404: (path) => {
		const app = document.getElementById('app');
		app.innerHTML = `<h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p>`;
	},
});

function clearScripts() {
	document.getElementById('app').innerHTML = '';
}

router.add('/', async () => {
	clearScripts();
	render1waitingScreen();
});

router.add('/screen2', async () => {
	clearScripts();
	render2welcomeScreen();
});

router.add('/screen3', async () => {
	clearScripts();
	render3instructionsScreen();
});

router.add('/screen4', async (params) => {
	clearScripts();
	render4questionScreen(params);
});

router.add('/screen5', async () => {
	clearScripts();
	render5processScreen();
});

router.add('/screen6', async () => {
	clearScripts();
	render6loadingScreen();
});

router.add('/screen7', async () => {
	clearScripts();
	render7visionBoardScreen();
});

router.add('/screen8', async () => {
	clearScripts();
	render8sharedVisionBoardsScreen();
});

router.check().addUriListener();

// Listen for popstate event to handle browser navigation
window.addEventListener('popstate', () => {
	router.check();
});

document.addEventListener('DOMContentLoaded', () => {
	router.check();
});

router.check();

export { router, socket };
