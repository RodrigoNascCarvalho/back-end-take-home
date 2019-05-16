const { connect } = require('./src/db')

const parseWithCallback = require('csv-parse')
const { promisify } = require('util')
const fs = require('fs')

const readFile = promisify(fs.readFile)
const parse = promisify(parseWithCallback)

const dbInitScript = `
    CREATE TABLE IF NOT EXISTS airlines (
        twoDigitCode VARCHAR(2) PRIMARY KEY,
        threeDigitCode VARCHAR(3) UNIQUE NOT NULL,
        name VARCHAR(50) NOT NULL,
        country VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS airports (
        iata3Code VARCHAR(3) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        city VARCHAR(50) NOT NULL,
        country VARCHAR(50) NOT NULL,
        latitude float NOT NULL,
        longitude float NOT NULL
    );

    CREATE TABLE IF NOT EXISTS routes (
        company VARCHAR(2) REFERENCES airlines(twoDigitCode),
        origin VARCHAR(3),
        destination VARCHAR(3),
        PRIMARY KEY (company, origin, destination)
    );
`

async function parseCsv(filepath) {
    try {
        const csvFile = await readFile(filepath)
        return await parse(csvFile, {
            from_line: 2
        })
    } catch (err) {
        throw err
    }
}

;(async () => {
    try {
        const client = await connect()

        console.log('Creating TABLES for DB')
        await client.query(dbInitScript) 
        
        console.log('Inserting AIRLINES into DB')
        let airlines = await parseCsv(__dirname + '/data/airlines.csv')
        airlines = airlines.map(([$1, $2, $3, $4]) => `('${$2}', '${$3}', '${$1}', '${$4}')`)
        const airlineValues = airlines.join(',')
        const airlineInsert = `INSERT INTO airlines(twoDigitCode, threeDigitCode, name, country) VALUES${airlineValues} ON CONFLICT DO NOTHING`
        await client.query(airlineInsert)
        console.log('Inserted:', airlineInsert)
    
        console.log('Inserting AIRPORTS into DB')
        let airports = await parseCsv(__dirname + '/data/airports.csv')
        for (const airportChunk of airports) {
            const airportInsert = {
                text: 'INSERT INTO airports(iata3Code, name, city, country, latitude, longitude) VALUES($4, $1, $2, $3, $5, $6) ON CONFLICT DO NOTHING',
                values: airportChunk,
            }
            await client.query(airportInsert)
            console.log('Inserted:', airportChunk)
        }

        console.log('Inserting ROUTES into DB')
        const routes = await parseCsv(__dirname + '/data/routes.csv')
        const routeValues = routes.map(([$1, $2, $3]) => `('${$1}', '${$2}', '${$3}')`).join(',')
        const routeInsert = `INSERT INTO routes(company, origin, destination) VALUES${routeValues} ON CONFLICT DO NOTHING`
        await client.query(routeInsert)
        console.log('Inserted:', routeInsert)

        client.release()
    } catch (err) {
        console.error('Something wrong happened!', err)
    }
})()
