const { Client } = require('pg')

const client = new Client({
    password: "postgres",
    user: "postgres",
    host: "postgres",
})

module.exports = (async () => {
    try {
        await client.connect()
    } catch (err) {
        console.log('Failed to connect to database!', err)
    }

    return {
        db: client
    }
})()
