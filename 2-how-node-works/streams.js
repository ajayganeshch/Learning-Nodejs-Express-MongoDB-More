const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Without using streams (Normal Way)
  /*
  fs.readFile("./test-file.txt", (err, data) => {
    if (err) console.log("error");
    res.end(data);
  });
  */
  // -------------------
  // Using Streams
  /*
  const readable = fs.createReadStream("./test-file.txt");
  readable.on("data", (chuck) => res.write(chuck));
  readable.on("end", () => res.end());
  readable.on("error", (err) => {
    res.statusCode = 500;
    console.log(err);
    res.end("File Not Found");
  });
  // -------------------
  */
  // Using Streams but this is Efficient
  const readable = fs.createReadStream("./test-file.txt");
  readable.pipe(res);
  //readableSource.pipe(writableStream)
  // -------------------
  // Another solution
  // const readable = fs.createReadStream("./test-file.txt");
  // readable.on("data", (chunk) => {
  //   const ok = res.write(chunk);
  //   if (!ok) {
  //     readable.pause();
  //     res.once("drain", () => {
  //       readable.resume();
  //     });
  //   }
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
});

server.listen(8090, "127.0.0.1", () => {
  console.log("Started... http://127.0.0.1:8090/");
});
