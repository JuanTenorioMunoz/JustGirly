import { router, socket } from "../routes.js";

let answer = "";
let questionCounter = "";

export default function renderOptionsScreen() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>OptionsScreen</h1>
        <p>Responde aquí</p>

        <button class="option" id="buttonA">A</button>
        <button class="option" id="buttonB">B</button>
        <button class="option" id="buttonC">C</button>
        <button class="option" id="buttonD">D</button>

        <button id="continueButton">Continue</button>
    `;

  document.getElementById("continueButton").addEventListener("click", () => {
    
    socket.emit("saveAnswers");
  });

  document.querySelectorAll(".option").forEach(button => {
    button.addEventListener("click", (event) => {
      answer = event.target.textContent; 
      console.log(`Selected answer: ${answer}`);
    });
  });
}
