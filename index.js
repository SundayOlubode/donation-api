const express = require('express')

const app = express()

app.get('/', (req, res, next) => {
    res.json('Welcome')
})

app.listen(9000, () => {
    console.log('Listening here...');
})