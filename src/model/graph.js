/** @module graph-builder */

/**
 * Builder factory function for creating directed graph
 * @function createGraph
 * @returns {Graph} object with methods for nodes, edges with cost, and adjacencyList
 */
const createGraph = () => {
    const adjacencyList = new Map()

    return Object.freeze({
        addNode(node) {
            adjacencyList.set(node, [])
        },
        addEdge(node, edge) {
            if (!adjacencyList.get(node)) 
                this.addNode(node)

            if (adjacencyList.get(node).find(adj => adj.destination === edge.destination))
                return

            adjacencyList.get(node).push(edge)
        },
        getNodesNames() {
            return adjacencyList.keys()
        },
        getAdjList() {
            return adjacencyList
        },
        getNode(node) {
            return adjacencyList.get(node)
        }
    })
}

/**
 * @function buildGraph
 * @returns {Graph}
 */
exports.Graph = () => {
    const graph = createGraph()

    return graph
}
