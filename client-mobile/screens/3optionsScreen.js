import { router, socket } from "../routes.js";

export default function renderOptionsScreen() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>OptionsScreen</h1>
        <p>This is the Screen 3</p>

        <button id="goToScreen4">Go to screen 4</button>
    `;

  document.getElementById("goToScreen4").addEventListener("click", () => {
    router.navigateTo("/4formScreen");
    socket.emit("saveAnswers");
  });
}
