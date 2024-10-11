import { router, socket } from "../../client-mobile/routes.js";

export default function renderScreen1() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>Screen 1</h1>
        <p>This is the Screen 1</p>
        <button id="emitButton">Emit Event</button>
        <button id="goToScreen2">Go to Screen 2</button>
    `;

  document.getElementById("emitButton").addEventListener("click", () => {
    console.log("emited");
    socket.emit("event1", { message: "Hello from About page" });
  });

  document.getElementById("goToScreen2").addEventListener("click", () => {
    router.navigateTo("/screen2");
  });
}

//listen for presenceToServer arduino event que deberia ser un endpoint
// cambia de screen