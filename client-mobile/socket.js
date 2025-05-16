export const local = "https://572f-200-3-193-229.ngrok-free.app"
const socket = io(local, { path: "/real-time" }); // Update this to your server URL

socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

export default socket;
