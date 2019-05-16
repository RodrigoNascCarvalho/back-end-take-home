const express = require('express')
const app = express()

/**
 * Move this to routes folder later.
 */
const { findShortestFlight } = require('./model/flights')

app.get('/fastestFlight', async function (req, res) {
  try {
    const { origin, destination } = req.query
    const shortestPath = await findShortestFlight(origin, destination)

    if (!shortestPath.length) {
      res.status(404)
      res.send({
        message: `No route found between ${origin} to ${destination}` 
      })
      return
    }

    const flights = shortestPath.reduce((flights, path, index) => {
      if (index + 1 < shortestPath.length) {
        flights.push([path, shortestPath[index + 1]])
      }

      return flights
    }, [])

    res.send({
      origin,
      destination,
      flights
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
