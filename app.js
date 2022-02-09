const host = "localhost";
// const http = require("http");
// const port = 5000;
// const fs = require('fs');

const express = require("express");
const app = express();
const port = 3000;

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       "Content-Type": "text-html",
//     });
//     const url = req.url;

//     const getPage = (path, res) => {
//        fs.readFile(path, (err, data) => {
//            if(err){
//                res.writeHead(404)
//                res.write("Not Found")
//            }
//            else {
//                res.write(data)
//            }
//            res.end()
//        })
//     }

//     if (url === "/about") {
//       getPage('./about.html', res)
//     } else if (url === "/contact") {
//       getPage('./contact.html', res)
//     } else {
//       getPage('./home.html', res)
//     }
//   })
//   .listen(port, () => {
//     console.info(`Server berjalan http://${host}:${port}`);
//   });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res)=>{
  res.sendFile("./about.html", {root: __dirname});
});

app.get('/detail/:id', (req, res)=>{
    res.send(`Selamat Datang ${req.params.id}`);
})

app.listen(port, ()=>{
    console.info(`Server Berjalan di http://${host}:${port}`);
})