const express = require('express')
const { db } = require('./db')

const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

;(async () => {
    app.listen(3000, () => {
        console.log("Started at http://localhost:%d", 3000)
    })
})()
