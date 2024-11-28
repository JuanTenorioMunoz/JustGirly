const { SerialPort, ReadlineParser } = require("serialport");

const {presenceToServer, absenceToServer} = require("../server/controllers/arduino")

SerialPort.list().then((ports) => {
//   console.log("ports", ports); // this is for list all available devices connected
}); 

// create a port to listen and write
const port = new SerialPort({
  path: "COM5",
  baudRate: 9600,
});

// Create a parser
const parser = new ReadlineParser({ delimiter: "\r\n" }); // apply the parser to our port
port.pipe(parser);

// --------------- SERIAL LISTENERS ---------------------

let timer = 0; 
let presence = false;

parser.on("data", async (data) => {
  try {
    timer += 1; 
    console.log("this timer", timer);

  if (data <= 1000) {
    console.log("very close", data);
    console.log("I won't change bro")

     if (presence == false)
    presenceToServer();
    presence = true
    timer = 0
  }

  if (timer == 1500) {
    timer = 0;
    presence = false;
    console.log("restarting")
    absenceToServer();
  }

  } catch (err) {
    console.error("Error sending presence to server:", err.message);
  }
});

port.on("error", (err) => {
  console.log("Error:", err.message);
});

