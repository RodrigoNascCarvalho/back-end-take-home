const { getFlightDistances } = require('../db')
const { Graph } = require('./graph')
const { dikjstra } = require('../util/dikjstra')

module.exports = {
    findShortestFlight: async (origin, destination) => {
        try {
            const flightGraph = Graph()
            const flightDistances = await getFlightDistances()

            flightDistances.rows.forEach(({origin, destination, cost}) => {
                flightGraph.addEdge(origin, { destination, cost })
            })

            return dikjstra(flightGraph, origin, destination)
        } catch (err) {
            throw err
        }
    }
}
