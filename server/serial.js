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

parser.on("data", (data) => {
  try {
 
    if (data <= 1000) {
      console.log("very close", data);

      presenceToServer();
    } else {
      console.log("too far", data);
    }
  } catch (err) {
    console.error("Error parsing data:", err.message);
  }
});

port.on("error", (err) => {
  console.log("Error:", err.message);
});

