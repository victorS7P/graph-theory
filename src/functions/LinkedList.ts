import { Graph } from '@models/Graph'

export class LinkedListFunctions {
  public static isCycle (graph: Graph, nodes: number[]): boolean {
    return nodes.every(
      (node, i) => (
        (nodes.length - 1) === i
          ? node === nodes[0]
          : graph.linkedLists[node - 1].hasNodeWithData(nodes[i + 1].toString())
      )
    )
  }

  public static isSimpleCycle (graph: Graph, nodes: number[]): boolean {
    const startIsEnd = nodes[0] === nodes[nodes.length - 1]
    const noDuplicates = (new Set(nodes).size === (nodes.length - 1)) && startIsEnd
    return (noDuplicates && this.isCycle(graph, nodes))
  }

  public static getDFSPath (graph: Graph, start: number, end: number, visited: number[], path: number[]): number[] {
    const linkedList = graph.linkedLists[start - 1]

    if (start === end) {
      return [...path, end]
    }

    const currentPath = [...path, start]
    const connectedNodes = linkedList.connectedNodes
      .filter(n => !visited.includes(n))

    let pathToReturn: number[] = []
    connectedNodes.forEach(node => {
      const nextPath = this.getDFSPath(graph, node, end, [...visited, start], currentPath)
      if (nextPath.length > currentPath.length) {
        pathToReturn = nextPath
      }
    })

    return pathToReturn
  }

  public static hasDFSPath (graph: Graph, start: number, end: number, visited: number[], path: number[]): boolean {
    return this.getDFSPath(graph, start, end, visited, path).length > 0
  }

  public static isEulerian (graph: Graph): boolean {
    return graph.isConnected() && graph.linkedLists.every(l => l.connectedNodes.length % 2 === 0)
  }

  public static hasEulerianTrail (graph: Graph): boolean {
    return graph.isConnected() && graph.linkedLists.filter(l => l.connectedNodes.length % 2 === 1).length <= 2
  }
}
