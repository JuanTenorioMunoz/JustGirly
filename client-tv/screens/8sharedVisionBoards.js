import { router, socket } from '../routes.js';

export default function render8sharedVisionBoardsScreen() {
	const app = document.getElementById('app');
	app.innerHTML = `
        <img class="marco2" src='./assets/MarcoTv.png'>
        <div class="sharedscreen">
        <h1>Vision boards de otras Girlys</h1>


        <div class="othergirlys">
        <img src="" alt="Vision board de usuario anterior" />
         <img src="" alt="Vision board de usuario anterior" />
          <img src="" alt="Vision board de usuario anterior" />
           <img src="" alt="Vision board de usuario anterior" />
            <img src="" alt="Vision board de usuario anterior" />
            <img src="" alt="Vision board de usuario anterior" />
         <img src="" alt="Vision board de usuario anterior" />
          <img src="" alt="Vision board de usuario anterior" />
           <img src="" alt="Vision board de usuario anterior" />
            <img src="" alt="Vision board de usuario anterior" />
            <img src="" alt="Vision board de usuario anterior" />
         <img src="" alt="Vision board de usuario anterior" />
          <img src="" alt="Vision board de usuario anterior" />
           <img src="" alt="Vision board de usuario anterior" />
            <img src="" alt="Vision board de usuario anterior" />
            </div>
</div>

    `;
}
//show VBs
//wait 30 second and go back to 1st screen
