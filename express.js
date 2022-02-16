const express = require('express')
const app = express()
const host = "localhost"
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/about', (req, res) => {
    res.sendFile('./about.html', root, __dirname)
})

app.listen(port, () => {
    console.info(`Berjalan Di http://${host}:${port}`);
})