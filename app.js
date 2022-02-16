const host = "localhost";
const http = require("http");
const port = 5000;
const fs = require('fs');
http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text-html",
    });
    const url = req.url;

    const getPage = (path, res) => {
       fs.readFile(path, (err, data) => {
           if(err){
               res.writeHead(404)
               res.write("Not Found")
           }
           else {
               res.write(data)
           }
           res.end()
       })
    }

    if (url === "/about") {
      getPage('./about.html', res)
    } else if (url === "/contact") {
      getPage('./contact.html', res)
    } else {
      getPage('./home.html', res)
    }
  })
  .listen(port, () => {
    console.info(`Server berjalan http://${host}:${port}`);
  });