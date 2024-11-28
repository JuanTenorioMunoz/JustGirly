import renderWelcomeScreen from "./screens/1welcomeScreen.js";
import renderStartScreen from "./screens/2startScreen.js";
import renderOptionsScreen from "./screens/3optionsScreen.js";
import renderFormScreen from "./screens/4formScreen.js";
import renderLinktreeScreen from "./screens/5linktreeScreen.js";
import renderLeaveScreen from "./screens/leaveScreen.js";

import socket from "./socket.js";

const router = new Router({ // check this for more features with Router: https://github.com/Graidenix/vanilla-router
  mode: "hash",
  page404: (path) => {
    const app = document.getElementById("app");
    app.innerHTML = `<h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p>`;
  },
});

function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

router.add("/", async () => {
  clearScripts();
  renderWelcomeScreen();
});

router.add("/2startScreen", async () => {
  clearScripts();
  renderStartScreen();
});

router.add("/3optionsScreen", async () => {
  clearScripts();
  renderOptionsScreen();
});

router.add("/4formScreen", async () => {
  clearScripts();
  renderFormScreen();
});

router.add("/5linktreeScreen", async () => {
  clearScripts();
  renderLinktreeScreen();
});

router.add('/leave', async () => {
	clearScripts();
	renderLeaveScreen();
});

router.check().addUriListener();

// Listen for popstate event to handle browser navigation
window.addEventListener("popstate", () => {
  router.check();
});

document.addEventListener("DOMContentLoaded", () => {
  router.check();
});

router.check();

export { router, socket };
