import { router, socket } from "../routes.js";

export default function renderFormScreen() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>Form</h1>
        <p>This is the Screen 4</p>
        <button id="goToScreen5">goToScreen5</button>
    `;

  document.getElementById("goToScreen5").addEventListener("click", () => {
    router.navigateTo("/");
    socket.emit("saveUserInfo");
  });
}
