import { router, socket } from '../routes.js';

export default function render8sharedVisionBoardsScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <h1>Vision boards de otras Girlys</h1>
        <img src="" alt="Vision board de usuario anterior" />
         <img src="" alt="Vision board de usuario anterior" />
          <img src="" alt="Vision board de usuario anterior" />
           <img src="" alt="Vision board de usuario anterior" />
            <img src="" alt="Vision board de usuario anterior" />


    `;
}
//show VBs
//wait 30 second and go back to 1st screen