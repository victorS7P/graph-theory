import { Digraph } from '@models/Digraph'
import { Graph } from '@models/Graph'

describe('Exercises 05', () => {
  describe('Graph', () => {
    const g = new Graph(5)
    g.connectNodes(1, 3)
    g.connectNodes(2, 3)
    g.connectNodes(3, 5)
    g.connectNodes(5, 2)
    g.connectNodes(5, 4)

    const sg = new Graph(4)
    sg.connectNodes(1, 3)
    sg.connectNodes(2, 3)

    const gsb = new Graph(5)
    gsb.connectNodes(1, 3)
    gsb.connectNodes(3, 5)
    gsb.connectNodes(5, 4)

    const ag = new Graph(5)
    ag.connectNodes(1, 3)
    ag.connectNodes(2, 5)
    ag.connectNodes(3, 4)

    const gc = new Graph(8)
    gc.connectNodes(1, 3)
    gc.connectNodes(1, 2)
    gc.connectNodes(4, 5)
    gc.connectNodes(5, 6)
    gc.connectNodes(7, 8)

    describe('isSubgraph', () => {
      it('Graph sg should be a subgraph of Graph g', () => {
        expect(g.isSubgraph(sg)).toBe(true)
      })

      it('Graph ag should not be a subgraph of Graph g', () => {
        expect(g.isSubgraph(ag)).toBe(false)
      })
    })

    describe('isGeneratorSubgraph', () => {
      it('Graph gsb should be a generator subgraph of Graph g', () => {
        expect(g.isGeneratorSubgraph(gsb)).toBe(true)
      })

      it('Graph sg should not be a generator subgraph of Graph g', () => {
        expect(g.isGeneratorSubgraph(sg)).toBe(false)
      })
    })

    describe('inducedGraph', () => {
      it('should create an induced graph from Graph g', () => {
        const induced = g.inducedGraph([1, 3])
        expect(induced.hasConnection(1, 3)).toBe(true)
        expect(induced.hasConnection(2, 3)).toBe(false)
      })

      it('should throw an error if it is not possible to create an induced graph', () => {
        expect(() => g.inducedGraph([3])).toThrow('cant create graph wiht only one node')
        expect(() => g.inducedGraph([6, 7])).toThrow('cant create graph wiht nodes that doesnt exist')
        expect(() => g.inducedGraph([2, 4])).toThrow('cant create graph without connections')
      })
    })

    describe('componentsNumber', () => {
      it('Graph g should have only 1 component', () => {
        expect(g.componentsNumber()).toBe(1)
      })

      it('Graph gc should have 3 components', () => {
        expect(gc.componentsNumber()).toBe(3)
      })
    })

    describe('isConnected', () => {
      it('Graph g should be connected', () => {
        expect(g.isConnected()).toBe(true)
      })

      it('Graph gc should not be connected', () => {
        expect(gc.isConnected()).toBe(false)
      })
    })
  })

  describe('Digraph', () => {
    const d = new Digraph(8)
    d.connectNodes(1, 5)
    d.connectNodes(2, 1)
    d.connectNodes(3, 2)
    d.connectNodes(3, 4)
    d.connectNodes(4, 3)
    d.connectNodes(5, 2)
    d.connectNodes(6, 2)
    d.connectNodes(6, 5)
    d.connectNodes(6, 7)
    d.connectNodes(7, 6)
    d.connectNodes(8, 4)
    d.connectNodes(8, 7)
    d.connectNodes(8, 8)

    describe('stronglyConnectedComponents', () => {
      it('Digraph d strongly connected components should be [[2, 1, 5], [3, 4], [7, 6], [8]]', () => {
        expect(d.stronglyConnectedComponents()).toEqual(
          expect.arrayContaining([
            expect.arrayContaining([2, 1, 5]),
            expect.arrayContaining([3, 4]),
            expect.arrayContaining([7, 6]),
            expect.arrayContaining([8])
          ])
        )
      })
    })
  })
})
