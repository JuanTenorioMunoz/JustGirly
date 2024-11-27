const { SerialPort, ReadlineParser } = require("serialport");

const {presenceToServer} = require("../server/controllers/arduino")

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

parser.on("data", async (data) => {
  try {
    if (data <= 1000) {
      console.log("very close", data);
      const response = await fetch("http://localhost:5050/presenceToServer");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } else {
      timer += 1; // Increment the timer correctly
      console.log("this timer", timer); // Log the timer value
    }

  if (timer = 3000) {
    timer = 0;
    console.log("restarting")
    //router.navigateTo('/screen5');
  }

  } catch (err) {
    console.error("Error sending presence to server:", err.message);
  }
});

port.on("error", (err) => {
  console.log("Error:", err.message);
});

