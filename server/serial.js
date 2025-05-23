const { SerialPort, ReadlineParser } = require("serialport");
const {finalScreen} = require("../server/db/index")
const {presenceToServer, absenceToServer} = require("../server/controllers/arduino")

SerialPort.list().then((ports) => {
//   console.log("ports", ports); // this is for list all available devices connected
}); 

// create a port to listen and write
const port = new SerialPort({
  path: "/dev/cu.usbserial-1420",
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
  let finalScreenArd = finalScreen.status;
    //console.log(data)

  if (data <= 10) {
    timer = 0
     if (presence == false){
    presenceToServer();
    presence = true}} 

  else{

    if (finalScreenArd == 1){
      console.log("we made it")
      timer += 10
      //console.log("this timer", timer);
  }

    if(finalScreenArd == 0){
      timer += 1; 
      //console.log("this timer", timer);
    }}


  if (timer >= 10) {
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

