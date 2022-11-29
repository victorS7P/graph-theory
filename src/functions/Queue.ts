import { Graph } from '@models/Graph'

type BFSCallback = (node: number, queue: Array<number>) => void

type runBFS = (
  graph: Graph,
  node: number,
  callbacks?: {
    onVisit?: BFSCallback,
    onPop?: BFSCallback,
    onGetConnecteds?: (node: number, connecteds: Array<number>, queue: Array<number>, visited: Array<number>) => void
  }
) => void

export class QueueFunctions {
  public static runBFS: runBFS = (graph, node, callbacks) => {
    const visited = [node]
    if (callbacks?.onVisit) { callbacks?.onVisit(node, []) }

    const queue = [node]

    while (queue.length) {
      const n = queue.shift() as number
      if (callbacks?.onPop) { callbacks?.onPop(n, queue) }

      const connecteds = graph.getConnectedNodes(n)
      if (callbacks?.onGetConnecteds) { callbacks?.onGetConnecteds(n, connecteds, queue, visited) }

      for (const adj of connecteds) {
        if (!visited.includes(adj)) {
          visited.push(adj)
          if (callbacks?.onVisit) { callbacks?.onVisit(adj, queue) }

          queue.push(adj)
        }
      }
    }
  }

  public static getBFSVisitOrder (graph: Graph, node: number): Array<number> {
    const visitOrder: Array<number> = []
    
    QueueFunctions.runBFS(graph, node, {
      onVisit: node => visitOrder.push(node)
    })

    return visitOrder
  }

  public static getAllMinimumPaths (graph: Graph, node: number): Map<'string', number> {
    const getAllMinimumPaths = new Map()
    graph.nodesList.forEach(n => {
      getAllMinimumPaths[n] = (n === node) ? 0 : -1
    })

    QueueFunctions.runBFS(graph, node, {
      onGetConnecteds: (node, connecteds, _, visited) => {
        connecteds.filter(c => !visited.includes(c)).forEach(c => {
          getAllMinimumPaths[c] = getAllMinimumPaths[node] + 1
        })
      }
    })

    return getAllMinimumPaths
  }
}
