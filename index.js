const http = require("http");
const fetch = require("node-fetch");
const jsdom = require("jsdom");
const fs = require("fs");
const { JSDOM } = jsdom;
const port = process.env.port || 8000;
global.document = new JSDOM().window.document;
let htmlfile = fs.readFileSync("index.html", "utf-8");
const replace = (tempvalue, newvalue) => {
  // let temp=tempvalue.replace("{%title%}",newvalue.title)
  // temp=temp.replace("{%desc%}",newvalue.body)
  let temp = tempvalue.replace("{%divappend%}", `${newvalue}`);
  return temp;
};

const server = http.createServer((req, res) => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(json => {
      let div = document.createElement("div");
      json.forEach(element => {
        let console = () => {
          console.log("hello world");
        };
        if (div.innerHTML) {
          div.innerHTML += `<div class="card mid min-width" style="width: 18rem;" >
  <div>
  
  
  <img src="https://source.unsplash.com/random" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">${element.body}</p>
    <button  class="btn btn-primary" onclick="console" >Go somewhere</button>
  </div>
  </div>
  </div>`;
        } else {
          // console.log(element.title)
          div.innerHTML = `<div class="card mid min-width" style="width: 18rem;" >
  <div>
  
  
  <img src="https://source.unsplash.com/random" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">${element.body}</p>
    <button  class="btn btn-primary"onclick="console" >Go somewhere</button>
  </div>
  </div>
  </div>`;
        }

        // console.log(element[0])
      });
      const newhtmlfile = replace(htmlfile, div.innerHTML);

      res.end(newhtmlfile);
    });
});

server.listen(port, "127.0.0.1");
