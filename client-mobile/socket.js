export const local = "https://2b3f-190-108-78-158.ngrok-free.app"
const socket = io(local, { path: "/real-time" }); // Update this to your server URL

socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

export default socket;
