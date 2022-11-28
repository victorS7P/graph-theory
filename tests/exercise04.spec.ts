import { Digraph } from '@models/Digraph'

describe('Exercises 04', () => {
  describe('Topological Ordering', () => {
    const digraphWithCycle = new Digraph(5)
    digraphWithCycle.connectNodes(1, 3)
    digraphWithCycle.connectNodes(2, 3)
    digraphWithCycle.connectNodes(3, 5)
    digraphWithCycle.connectNodes(5, 2)

    const digraphWithoutCycle = new Digraph(7)
    digraphWithoutCycle.connectNodes(1, 2)
    digraphWithoutCycle.connectNodes(1, 3)
    digraphWithoutCycle.connectNodes(2, 3)
    digraphWithoutCycle.connectNodes(2, 4)
    digraphWithoutCycle.connectNodes(2, 5)
    digraphWithoutCycle.connectNodes(3, 4)
    digraphWithoutCycle.connectNodes(4, 7)
    digraphWithoutCycle.connectNodes(5, 6)
    digraphWithoutCycle.connectNodes(6, 7)

    it('digraphWithoutCycle should not have a topological order', () => {
      expect(digraphWithCycle.topologicalOrder()).toEqual([])
    })

    it('digraphWithoutCycle\'s topological order should be [1, 2, 5, 6, 3, 4, 7]', () => {
      expect(digraphWithoutCycle.topologicalOrder()).toEqual([1, 2, 5, 6, 3, 4, 7])
    })
  })
})
