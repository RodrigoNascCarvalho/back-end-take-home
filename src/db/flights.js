module.exports = (client) => ({
    getFlightDistances: async () => {
        await client.connect()

        const result = await client.query(`
            SELECT DISTINCT
                origin,
                destination,
                (SELECT ST_Distance(
                    ST_SetSRID(ST_MakePoint(a.latitude, a.longitude), 4326),
                    ST_SetSRID(ST_MakePoint(b.latitude, b.longitude), 4326)
                )) as cost
            FROM routes, airports a, airports b
            WHERE (a.iata3Code = origin) AND b.iata3Code = destination;
        `)

        return result
    }
})
