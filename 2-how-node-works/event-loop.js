const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();

// process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immideate 1 Finished"));

fs.readFile("./test-file.txt", () => {
  console.log("I/O Finished");
  console.log("------------------");
  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immideate 2 Finished"));

  process.nextTick(() => console.log("process nextTick"));
  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () =>
    console.log(Date.now() - start, "password encrypted")
  );
});

console.log("Hello From Top Level Code");
