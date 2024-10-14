import { router, socket } from "../routes.js"

export default function renderWelcomeScreen() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>Welcome Screen</h1>
        <p>glow up pls</p>
        <button id="goToScreen2">Go to Screen 2</button>
    `;

  document.getElementById("goToScreen2").addEventListener("click", () => {
    router.navigateTo("/2startScreen");
  });
}

//TIMER RUN OUT 10 SECS -> NEXT SCREEN
