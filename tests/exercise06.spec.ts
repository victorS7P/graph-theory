import { Graph } from '@models/Graph'

describe('Exercises 06', () => {
  describe('Graph', () => {
    const g = new Graph(8)
    g.connectNodes(1, 2)
    g.connectNodes(1, 4)
    g.connectNodes(1, 5)
    g.connectNodes(2, 3)
    g.connectNodes(2, 6)
    g.connectNodes(3, 4)
    g.connectNodes(3, 7)
    g.connectNodes(4, 8)
    g.connectNodes(5, 6)
    g.connectNodes(5, 8)
    g.connectNodes(6, 7)
    g.connectNodes(7, 8)

    const h = new Graph(3)
    h.connectNodes(1, 3)

    const i = new Graph(4)
    i.connectNodes(1, 3)
    i.connectNodes(1, 4)
    i.connectNodes(3, 4)

    describe('isBipartite', () => {
      it('Graph g should be bipartite', () => {
        const bipartiteInfo = g.bipartiteInfo()
        expect(bipartiteInfo.isBipartite).toBe(true)
        expect(bipartiteInfo.partitions).toEqual(
          expect.arrayContaining([
            expect.arrayContaining([1, 3, 6, 8]),
            expect.arrayContaining([2, 4, 5, 7])
          ])
        )
      })

      it('Graph h should not be bipartite', () => {
        const bipartiteInfo = h.bipartiteInfo()
        expect(bipartiteInfo.isBipartite).toBe(false)
        expect(bipartiteInfo.partitions).toEqual([])
      })

      it('Graph i should not be bipartite', () => {
        const bipartiteInfo = i.bipartiteInfo()
        expect(bipartiteInfo.isBipartite).toBe(false)
        expect(bipartiteInfo.partitions).toEqual([])
      })
    })

    describe('letcode - 886', () => {
      it('example 01', () => {
        const graph = Graph.fromLetCode886(4, [[0, 1], [0, 2], [1, 3]])
        const bipartiteInfo = graph.bipartiteInfo()
        expect(bipartiteInfo.isBipartite).toBe(true)
      })

      it('example 02', () => {
        const graph = Graph.fromLetCode886(4, [[0, 1], [0, 2], [1, 2]])
        const bipartiteInfo = graph.bipartiteInfo()
        expect(bipartiteInfo.isBipartite).toBe(false)
      })

      it('example 03', () => {
        const graph = Graph.fromLetCode886(5, [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]])
        const bipartiteInfo = graph.bipartiteInfo()
        expect(bipartiteInfo.isBipartite).toBe(false)
      })
    })
  })
})
