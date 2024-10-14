import { router, socket } from "../routes.js";

export default function renderStartScreen() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>start</h1>
        <p>Welcome to Screen 2</p>
        <button id="goToScreen3">Go to Screen 3</button>
    `;


  document.getElementById("goToScreen3").addEventListener("click", () => {
    router.navigateTo("/3optionsScreen");
  });
}
