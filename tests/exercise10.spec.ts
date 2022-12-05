import { PathWeightedGraph } from '@models/Graph/PathWeightedGraph'
import { NodeWeightedGraph } from '@models/Graph/NodeWeightedGraph'
import { Dijkstra } from '@functions/Djiskstra'

describe('Exercises 10', () => {
  describe('Dijkstra algorithm', () => {
    describe('Path-weighted graph', () => {
      const pathWGraph = new PathWeightedGraph(6)
      pathWGraph.connectNodesWieght(1, 2, 3)
      pathWGraph.connectNodesWieght(1, 4, 2)
      pathWGraph.connectNodesWieght(2, 3, 4)
      pathWGraph.connectNodesWieght(2, 4, 1)
      pathWGraph.connectNodesWieght(2, 5, 2)
      pathWGraph.connectNodesWieght(4, 5, 3)

      it('minimun weight from nodes 1 and 5 should be 5', () => {
        expect(Dijkstra.run(pathWGraph, 1)[5]).toBe(5)
      })

      it('minimun weight from nodes 3 and 1 should be 7', () => {
        expect(Dijkstra.run(pathWGraph, 3)[1]).toBe(7)
      })

      it('minimun weight from nodes 6 and anyone should be infinity', () => {
        expect(Dijkstra.run(pathWGraph, 6)[1]).toBe(Number.POSITIVE_INFINITY)
        expect(Dijkstra.run(pathWGraph, 6)[5]).toBe(Number.POSITIVE_INFINITY)
      })
    })

    describe('Node-weighted graph', () => {
      const nodeWGraph = new NodeWeightedGraph(6, [2, 4, 1, 5, 2, 3])
      nodeWGraph.connectNodes(1, 2)
      nodeWGraph.connectNodes(1, 3)
      nodeWGraph.connectNodes(2, 4)
      nodeWGraph.connectNodes(4, 5)

      it('minimun weight from nodes 1 and 5 should be 13', () => {
        expect(Dijkstra.runOnNodeWeight(nodeWGraph, 1)[5]).toBe(13)
      })

      it('minimun weight from nodes 3 and 1 should be 3', () => {
        expect(Dijkstra.runOnNodeWeight(nodeWGraph, 3)[1]).toBe(3)
      })

      it('minimun weight from nodes 6 and anyone should be infinity', () => {
        expect(Dijkstra.runOnNodeWeight(nodeWGraph, 6)[1]).toBe(Number.POSITIVE_INFINITY)
        expect(Dijkstra.runOnNodeWeight(nodeWGraph, 6)[5]).toBe(Number.POSITIVE_INFINITY)
      })
    })

    describe('Path-weighted graph using Heap', () => {
      const pathWGraph = new PathWeightedGraph(6)
      pathWGraph.connectNodesWieght(1, 2, 3)
      pathWGraph.connectNodesWieght(1, 4, 2)
      pathWGraph.connectNodesWieght(2, 3, 4)
      pathWGraph.connectNodesWieght(2, 4, 1)
      pathWGraph.connectNodesWieght(2, 5, 2)
      pathWGraph.connectNodesWieght(4, 5, 3)

      it('minimun weight from nodes 1 and 5 should be 5', () => {
        expect(Dijkstra.runUsingHeap(pathWGraph, 1)[5]).toBe(5)
      })

      it('minimun weight from nodes 3 and 1 should be 7', () => {
        expect(Dijkstra.runUsingHeap(pathWGraph, 3)[1]).toBe(7)
      })

      it('minimun weight from nodes 6 and anyone should be infinity', () => {
        expect(Dijkstra.runUsingHeap(pathWGraph, 6)[1]).toBe(Number.POSITIVE_INFINITY)
        expect(Dijkstra.runUsingHeap(pathWGraph, 6)[5]).toBe(Number.POSITIVE_INFINITY)
      })
    })
  })
})
