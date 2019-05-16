

const prev = []
const distances = []
let visited = []

/**
 * @function dikjstra
 * @param {Graph} graph
 * @param {String} source
 * @param {String} target
 * @returns {Array} shortestPath array
 */
exports.dikjstra = (graph, source, target) => {
    for (const name of graph.getNodesNames()) {
        prev[name] = undefined
        distances[name] = Number.MAX_SAFE_INTEGER
        visited.push(name)
    }

    distances[source] = 0
    while (visited.length > 0) {
        const minimumDistanceNode = visited.reduce((min, curr) => distances[curr] < min ? curr : min)
        visited = visited.filter(dest => dest !== minimumDistanceNode)

        if(minimumDistanceNode === target) {
            break;
        }

        graph.getNode(minimumDistanceNode).forEach(child => {
            const alt = distances[minimumDistanceNode] + child.cost

            if (alt < distances[child.destination]) {
                distances[child.destination] = alt
                prev[child.destination] = minimumDistanceNode
            }
        })
    }

    const shortestPath = []
    let backtrack = target
    if (prev[backtrack] || backtrack === source) {
        while (backtrack) {
            shortestPath.unshift(backtrack)
            backtrack = prev[backtrack]
        }
    }

    return shortestPath
}
