const EventEmitter = require("events");
const http = require("http");

////////////////////////////////////////////////////////

let myEmmitter = new EventEmitter();

myEmmitter.on("newSale", () => console.log("New Sale"));
myEmmitter.on("newSale", () => console.log("Ajay Ganesh"));

myEmmitter.emit("newSale");

////////////////////////////////////////////////////////////////

console.log("-------------");

class Orderd extends EventEmitter {
  constructor() {
    super();
  }
}

let secondEmmitter = new Orderd();

secondEmmitter.on("orderdSuccessfully", () => console.log("Order Placed"));
secondEmmitter.on("orderdSuccessfully", () =>
  console.log("Ajay Ganesh Orderd")
);

secondEmmitter.emit("orderdSuccessfully");

////////////////////////////////////////////////////////////////

// Server

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("URL Path", req.url);
  res.end("Request Printed");
});

server.on("request", (req, res) => {
  console.log("Another req Recived");
});

server.on("close", () => {
  console.log("sever closed");
});

setTimeout(() => {
  server.close();
}, 5000); // server will close after 5 seconds

server.listen(8090, "127.0.0.1", () => {
  console.log("Sever Started on http://127.0.0.1:8090/");
});
