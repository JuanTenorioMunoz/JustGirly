const { SerialPort, ReadlineParser } = require("serialport");
const {finalScreen} = require("../server/db/index")
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
let finalScreenArd = finalScreen.status

parser.on("data", async (data) => {
  try {
  if (finalScreenArd == 1){
    console.log(finalScreenArd)
  }
  if(finalScreenArd == 0){
    timer += 1; 
    console.log("this timer", timer);

  if (data <= 1000) {
    console.log("very close", data);
    console.log("I won't change bro")

     if (presence == false)
    presenceToServer();
    presence = true
    timer = 0
    finalScreenArd = false
  }
  } else {

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

