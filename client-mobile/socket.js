export const local = "http://localhost:5050"
const socket = io(local, { path: "/real-time" }); // Update this to your server URL

socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

export default socket;
