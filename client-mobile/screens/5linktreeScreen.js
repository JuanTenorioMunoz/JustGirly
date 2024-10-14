import { router, socket } from "../routes.js";

export default function renderLinktreeScreen() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>Linktree</h1>
        <p>Links here</p>
        <button id="linkTreeButton">yo check my ig</button>
    `;

  document.getElementById("linkTreeButton").addEventListener("click", () => {
    socket.emit("event2");
  });
}

//IDK
//TEST