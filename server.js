require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const notesRoute = require('./src/notes/routes');
const multer = require('multer');
const port =  process.env.PORT;
const host = process.env.HOST;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(notesRoute);

app.get('/', (req, res)=>{
    res.send('Hello World!');
})

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

let formatFile = true;
const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
        cb(null, true);
    }
    else{
        cb(null, false);
        formatFile = false;
    }
}

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter
  }).single('image')
);

app.post('/uploads', (req, res) => {
  if (formatFile === false) {
    res.json({
      status: "Fail",
      message: "Format file tidak sesuai"
    });
    formatFile = true;
  } 
  
  else if(!req.file){
    res.json({
        status: "Fail",
        message: "File tidak boleh kosong",
    });
  }
  
  else {
    const image = req.file.path;
    res.json({
      status: "Success",
      message: image
    });
  }
});

app.listen(port, ()=>{
    console.info(`Example app listening on http://${host}:${port}`);
})