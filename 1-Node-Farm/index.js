const fs = require("fs");
const http = require("http");
const url = require("url");

const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

// --------------------------------------------------------------

// Synchronous Way:

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This text was not written by Ajay Ganesh: ${textIn}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("done");

//Asynchronous Way:

// fs.readFile("./txt/start.txt","utf-8",(err,data)=>{
// console.log(data);
// });

// --------------------------------------------------------------

// Server

const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
console.log("Exectued");

// console.log(slugify("Fresh Avacados", { lower: true }));

const slugs = dataObj.map((ele) => slugify(ele.productName, { lower: true }));
console.log(slugs);

const newDataObj = dataObj.map((ele, i) => {
  return { ...ele, slug: slugs[i] };
});

console.log(newDataObj);

// Create server

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    let cardsHtml = newDataObj
      .map((ele) => replaceTemplate(templateCard, ele))
      .join("");
    let cardsOutput = templateOverview.replace("{%Card%}", cardsHtml);

    res.end(cardsOutput);
  }
  //Product Page
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const item = newDataObj.find((ele) => ele.slug === query.id);
    const presentId = item ? item.id : "Not found";
    let selectedProduct = newDataObj[presentId];
    let overviewOutput = replaceTemplate(templateProduct, selectedProduct);
    res.end(overviewOutput);
  }
  //Api Page
  else if (pathname === "/api") {
    /*

    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      console.log(typeof data);

      res.writeHead(200, { "Content-type": "application/json" });

      // const productData = JSON.parse(data);
      // console.log(productData);
      // console.log(typeof productData);

      res.end(data);
    });
    */

    // Create a new title tag

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(newDataObj));
  }
  //Not Found Page
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page Not Found! Error (404)</h1>");
  }
});

server.listen(8090, "127.0.0.1", () => {
  console.log("Started on port 8090 and 127.0.0.1");
  console.log("http://127.0.0.1:8090/");
});
