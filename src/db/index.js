const { Pool } = require('pg')
const flights = require('./flights')

const pool = new Pool({
    password: "postgres",
    user: "postgres",
    host: "postgres",
})

module.exports = (() => {
    return {
        connect: async () => await pool.connect(),
        ...flights(pool)
    }
})()
