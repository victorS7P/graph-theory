import { Graph } from '@models/Graph'

describe('Exercises 07', () => {
  describe('Graph', () => {
    const g = new Graph(6)
    g.connectNodes(1, 2)
    g.connectNodes(1, 3)
    g.connectNodes(2, 3)
    g.connectNodes(2, 4)
    g.connectNodes(4, 5)
    g.connectNodes(4, 6)
    g.connectNodes(5, 6)

    const biconnected = new Graph(5)
    biconnected.connectNodes(1, 2)
    biconnected.connectNodes(1, 3)
    biconnected.connectNodes(2, 5)
    biconnected.connectNodes(3, 4)
    biconnected.connectNodes(4, 5)

    describe('getBridgesNaive', () => {
      it('Graph g should have 3 bridges', () => {
        expect(g.getBridgesNaive()).toEqual(
          expect.arrayContaining([
            expect.arrayContaining([2, 4])
          ])
        )
      })

      it('Graph biconnected should have 0 bridges', () => {
        expect(biconnected.getBridgesNaive()).toEqual([])
      })
    })

    describe('getBridgesDFS', () => {
      it('Graph g should have 1 bridges', () => {
        expect(g.getBridgesDFS()).toEqual(
          expect.arrayContaining([
            expect.arrayContaining([2, 4])
          ])
        )
      })

      it('Graph biconnected should have 0 bridges', () => {
        expect(biconnected.getBridgesDFS()).toEqual([])
      })
    })

    describe('getArticulationsNaive', () => {
      it('Graph g should have 2 articulation points', () => {
        expect(g.getArticulationsNaive()).toEqual(
          expect.arrayContaining([2, 4])
        )
      })

      it('Graph biconnected should have 0 articulation points', () => {
        expect(biconnected.getArticulationsNaive()).toEqual([])
      })
    })

    describe('getArticulationsDFS', () => {
      it('Graph g should have 1 bridges', () => {
        expect(g.getArticulationsDFS()).toEqual(
          expect.arrayContaining([2, 4])
        )
      })

      it('Graph biconnected should have 0 bridges', () => {
        expect(biconnected.getArticulationsDFS()).toEqual([])
      })
    })

    describe('isBiconnected', () => {
      it('Graph g should not be biconnected', () => {
        expect(g.isBiconnected()).toBe(false)
      })

      it('Graph biconnected should be biconnected', () => {
        expect(biconnected.isBiconnected()).toBe(true)
      })
    })
  })
})
