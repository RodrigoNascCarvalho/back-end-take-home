const { Pool } = require('pg')
const flights = require('./flights')

const client = new Pool({
    password: "postgres",
    user: "postgres",
    host: "postgres",
})

async function tryConnect(db) {
    try {
        await db.connect()
        console.log('Connected to database with success.')
        return db
    } catch (err) {
        setTimeout(() => {
        console.log('Trying to connect again after 5 seconds...')
        tryConnect(db)
        }, 5000)
    }
}

module.exports = (() => {
    return {
        connect: async () => await tryConnect(client),
        ...flights(client)
    }
})()
