const express = require('express')
const path = require('path')

const app = express()

app.use(express.static('static-resources'))

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'index.html'))
// })

app.get('*', (req, res) => {
    res.status(404).send('<h1>resource not found.</h1>')
})

app.listen((5000), () => {
    console.log('server listening on port 5000...');
})