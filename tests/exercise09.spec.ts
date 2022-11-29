import { Digraph } from '@models/Digraph'
import { Graph } from '@models/Graph'

import { QueueFunctions } from '@functions/Queue'

describe('Exercises 09', () => {
  describe('BFS Search', () => {
    const d = new Digraph(6)
    d.connectNodes(1, 3)
    d.connectNodes(1, 4)
    d.connectNodes(1, 5)
    d.connectNodes(2, 3)
    d.connectNodes(2, 5)
    d.connectNodes(3, 5)
    d.connectNodes(4, 5)
    d.connectNodes(4, 6)
    d.connectNodes(5, 6)
    d.connectNodes(6, 1)

    const g = new Graph(8)
    g.connectNodes(1, 3)
    g.connectNodes(1, 8)
    g.connectNodes(3, 7)
    g.connectNodes(4, 5)
    g.connectNodes(4, 6)
    g.connectNodes(5, 6)
    g.connectNodes(6, 1)
    g.connectNodes(7, 5)
    g.connectNodes(8, 2)
    g.connectNodes(8, 5)

    describe('visitOrder', () => {
      it('Digraph d visit order from node 1 should be [1, 3, 4, 5, 6]', () => {
        expect(QueueFunctions.getBFSVisitOrder(d, 1)).toEqual([1, 3, 4, 5, 6])
      })

      it('Graph g visit order from node 1 should be [1, 3, 6, 8, 2, 5, 4, 7]', () => {
        expect(QueueFunctions.getBFSVisitOrder(g, 1)).toEqual([1, 3, 6, 8, 7, 4, 5, 2])
      })
    })

    describe('minimun paths', () => {
      it('Digraph d should have correct paths from 1 to other nodes', () => {
        const paths = QueueFunctions.getAllMinimumPaths(d, 1)
        expect(paths['1']).toEqual(0)
        expect(paths['2']).toEqual(-1)
        expect(paths['3']).toEqual(1)
        expect(paths['4']).toEqual(1)
        expect(paths['5']).toEqual(1)
        expect(paths['6']).toEqual(2)
      })

      it('Graph g should have correct paths from 1 to other nodes', () => {
        const paths = QueueFunctions.getAllMinimumPaths(g, 1)
        expect(paths['1']).toEqual(0)
        expect(paths['2']).toEqual(2)
        expect(paths['3']).toEqual(1)
        expect(paths['4']).toEqual(2)
        expect(paths['5']).toEqual(2)
        expect(paths['6']).toEqual(1)
        expect(paths['7']).toEqual(2)
      })
    })
  })
})
