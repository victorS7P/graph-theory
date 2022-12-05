import { PathWeightedDigraph } from '@models/Digraph/PathWeightedDigraph'

export class BellmanFord {
  public distances: number[] = []
  public predecessors: (null|number)[] = []

  public initUniqueSource (graph: PathWeightedDigraph, source: number): void {
    graph.nodesList.forEach(node => {
      this.distances[node] = Number.POSITIVE_INFINITY
      this.predecessors[node] = null
    })

    this.distances[source] = 0
  }

  public relax (graph: PathWeightedDigraph, u: number, v: number): void {
    const dist = graph.getPathWeight(u, v)
    const totalDistance = this.distances[u] + dist

    if (this.distances[v] > totalDistance) {
      this.distances[v] = totalDistance 
      this.predecessors[v] = u
    }
  }

  public run (graph: PathWeightedDigraph, source: number): boolean {
    this.initUniqueSource(graph, source)
    
    let i = 1
    while (i <= graph.nodesList.length - 1) {
      graph.connections.forEach(([u, v]) => {
        this.relax(graph, u, v)
      })

      i++
    }

    for (const [u, v] of graph.connections) {
      if (this.distances[v] > this.distances[u] + graph.getPathWeight(u, v)) {
        return false
      }
    }

    return true
  }
}
