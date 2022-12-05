import { Heap } from './Heap'

import { Graph } from '@models/Graph'
import { NodeWeightedGraph } from '@models/Graph/NodeWeightedGraph'
import { PathWeightedGraph } from '@models/Graph/PathWeightedGraph'

export class Dijkstra {
  public static extractMin (known: number[], distances: number[], graph: Graph): number {
    let smaller = Number.POSITIVE_INFINITY
    let min = 1

    graph.nodesList.forEach(n => {
      if (!known.includes(n) && distances[n] < smaller) {
        smaller = distances[n]
        min = n
      }
    })

    return min
  }

  public static run (graph: PathWeightedGraph, start: number): number[] {
    const distances: number[] = []
    const predecessors: (number|null)[] = []

    graph.nodesList.forEach(n => {
      distances[n] = Number.POSITIVE_INFINITY
      predecessors[n] = null
    })

    distances[start] = 0
    const known: number[] = []

    let notVisited = graph.nodesList.length
    while (notVisited > 0) {
      const node = Dijkstra.extractMin(known, distances, graph)
      known.push(node)

      graph.getConnectedNodes(node).forEach(connected => {
        if (distances[connected] > distances[node] + graph.getPathWeight(node, connected)) {
          distances[connected] = distances[node] + graph.getPathWeight(node, connected)
          predecessors[connected] = node
        }
      })

      notVisited--
    }

    return distances
  }

  public static runOnNodeWeight (graph: NodeWeightedGraph, start: number): number[] {
    const distances: number[] = []
    const predecessors: (number | null)[] = []

    graph.nodesList.forEach(n => {
      distances[n] = Number.POSITIVE_INFINITY
      predecessors[n] = null
    })

    distances[start] = graph.getNodeWeight(start)
    const known: number[] = []

    let notVisited = graph.nodesList.length
    while (notVisited > 0) {
      const node = Dijkstra.extractMin(known, distances, graph)
      known.push(node)

      graph.getConnectedNodes(node).forEach(connected => {

        if (distances[connected] > distances[node] + graph.getPathWeight(node, connected)) {
          distances[connected] = distances[node] + graph.getNodeWeight(connected)
          predecessors[connected] = node
        }
      })

      notVisited--
    }

    return distances
  }

  public static runUsingHeap (graph: PathWeightedGraph, start: number): number[] {
    const distances: number[] = []
    const predecessors: (number | null)[] = []
    const queue = new Heap()

    graph.nodesList.forEach(n => {
      distances[n] = Number.POSITIVE_INFINITY
      predecessors[n] = null
    })

    distances[start] = 0
    queue.insert(start)

    while (queue.heap.length > 1) {
      const node = queue.remove()

      if (node) {
        graph.getConnectedNodes(node).forEach(connected => {
          if (distances[connected] > distances[node] + graph.getPathWeight(node, connected)) {
            distances[connected] = distances[node] + graph.getPathWeight(node, connected)
            predecessors[connected] = node
            queue.insert(connected)
          }
        }) 
      }
    }

    return distances
  }
}
