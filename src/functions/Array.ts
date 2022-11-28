import { Graph } from '@models/Graph'

export class ArrayFunctions {
  public static isCycle (graph: Graph, nodes: number[]): boolean {
    return nodes.every(
      (node, i) => {
        return (
          (nodes.length - 1) === i
            ? node === nodes[0]
            : graph.hasConnection(node, nodes[i + 1])
        )
      }
    )
  }

  public static isSimpleCyrcle (graph: Graph, nodes: number[]): boolean {
    const startIsEnd = nodes[0] === nodes[nodes.length - 1]
    const noDuplicates = (new Set(nodes).size === (nodes.length - 1)) && startIsEnd
    return (noDuplicates && this.isCycle(graph, nodes))
  }

  public static getDFSPath (graph: Graph, start: number, end: number, visited: number[], path: number[]): number[] {
    if (start === end) {
      return [...path, end]
    }

    const currentPath = [...path, start]
    const connectedNodes = graph.getConnectedNodes(start)
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
}
