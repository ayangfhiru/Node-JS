require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const notesRoute = require('./src/notes/routes');
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

app.listen(port, ()=>{
    console.info(`Example app listening on http://${host}:${port}`);
})