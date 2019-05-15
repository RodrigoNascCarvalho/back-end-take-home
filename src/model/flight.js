const { getFlightDistances } = require('../db')

module.exports = {
    findShortestFlight: async (origin, destination) => {
        const flightDistances = await getFlightDistances()

        return flightDistances
    }
}
