const express = require('express')
const app = express()


/**
 * Move this to routes folder later.
 */
const { findShortestFlight } = require('./model/flight') 

app.get('/fastestFlight', async function (req, res) {
  const { origin, destination } = req.query
  const result = await findShortestFlight(origin, destination)

  try {
    res.send({
      origin,
      destination,
      ...result && result.rows
    })
  } catch (err) {
    res.status(500)
    res.send({
      message: 'Internal server error'
    })
  }
})

;(async () => {
    app.listen(3000, () => {
        console.log("Started at http://localhost:%d", 3000)
    })
})()
