import { BellmanFord } from '@functions/BellmanFord'
import { PathWeightedDigraph } from '@models/Digraph/PathWeightedDigraph'

describe('Exercises 11', () => {
  describe('Bellman-Ford algorithm', () => {
    describe('Path-weighted graph', () => {
      const digraphWithoutPath = new PathWeightedDigraph(8)
      digraphWithoutPath.connectNodesWieght(1, 2,  3)
      digraphWithoutPath.connectNodesWieght(1, 3,  5)
      digraphWithoutPath.connectNodesWieght(1, 4,  2)
      digraphWithoutPath.connectNodesWieght(2, 7, -4)
      digraphWithoutPath.connectNodesWieght(3, 6,  6)
      digraphWithoutPath.connectNodesWieght(4, 5,  2)
      digraphWithoutPath.connectNodesWieght(5, 4, -6)
      digraphWithoutPath.connectNodesWieght(5, 8,  7)
      digraphWithoutPath.connectNodesWieght(6, 3, -3)
      digraphWithoutPath.connectNodesWieght(6, 8,  8)
      digraphWithoutPath.connectNodesWieght(7, 8,  4)

      const digraphWithPath = new PathWeightedDigraph(5)
      digraphWithPath.connectNodesWieght(1, 2,  6)
      digraphWithPath.connectNodesWieght(1, 4,  7)
      digraphWithPath.connectNodesWieght(2, 4,  8)
      digraphWithPath.connectNodesWieght(2, 3,  5)
      digraphWithPath.connectNodesWieght(2, 5, -4)
      digraphWithPath.connectNodesWieght(3, 2, -2)
      digraphWithPath.connectNodesWieght(4, 3, -3)
      digraphWithPath.connectNodesWieght(4, 5,  9)
      digraphWithPath.connectNodesWieght(5, 1,  2)
      digraphWithPath.connectNodesWieght(5, 3,  7)

      it('should return a false flag for digraph digraphWithoutPath', () => {
        expect(new BellmanFord().run(digraphWithoutPath, 1)).toBe(false)
      })

      it('should return a true flag for digraph digraphWithPath', () => {
        expect(new BellmanFord().run(digraphWithPath, 1)).toBe(true)
      })

      it('minimun weight from nodes 1 and 5 should be -2', () => {
        const bellmanFord = new BellmanFord()
        bellmanFord.run(digraphWithPath, 1)
        expect(bellmanFord.distances[5]).toBe(-2)
      })
    })
  })
})
