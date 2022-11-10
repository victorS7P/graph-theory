import { Graph } from '@models/Graph'
import { Digraph } from '@models/Digraph'

import {
  hasCycle,
  hasCycleUsingReturnArchs,
  hasCycleUsingStack
} from '@exercises/03'

describe('Exercises 02', () => {
  describe('Graph', () => {
    const graphWithCycle = new Graph(5)
    graphWithCycle.connectNodes(1, 3)
    graphWithCycle.connectNodes(3, 5)
    graphWithCycle.connectNodes(5, 1)
    graphWithCycle.connectNodes(2, 4)
    graphWithCycle.connectNodes(2, 1)

    const graphWithoutCycle = new Graph(5)
    graphWithoutCycle.connectNodes(1, 2)
    graphWithoutCycle.connectNodes(1, 3)
    graphWithoutCycle.connectNodes(3, 5)
    graphWithoutCycle.connectNodes(5, 4)

    describe('has circle', () => {
      it('graphWithCycle should has a cycle', () => {
        expect(hasCycle(graphWithCycle)).toBe(true)
      })

      it('graphWithoutCycle should not have a cycle', () => {
        expect(hasCycle(graphWithoutCycle)).toBe(false)
      })
    })
  })

  describe('Digraph', () => {
    const digraphWithCycle = new Digraph(5)
    digraphWithCycle.connectNodes(1, 3)
    digraphWithCycle.connectNodes(3, 5)
    digraphWithCycle.connectNodes(5, 1)

    const digraphWithoutCycle = new Digraph(5)
    digraphWithoutCycle.connectNodes(1, 2)
    digraphWithoutCycle.connectNodes(1, 3)
    digraphWithoutCycle.connectNodes(3, 5)
    digraphWithoutCycle.connectNodes(5, 2)

    describe('has circle', () => {
      it('digraphWithCycle should has a cycle', () => {
        expect(hasCycle(digraphWithCycle)).toBe(true)
      })

      it('digraphWithoutCycle should not have a cycle', () => {
        expect(hasCycle(digraphWithoutCycle)).toBe(false)
      })
    })

    describe('has circle (using stack)', () => {
      it('digraphWithCycle should has a cycle', () => {
        expect(hasCycleUsingStack(digraphWithCycle)).toBe(true)
      })

      it('digraphWithoutCycle should not have a cycle', () => {
        expect(hasCycleUsingStack(digraphWithoutCycle)).toBe(false)
      })
    })

    describe('has circle (using return archs)', () => {
      it('digraphWithCycle should has a cycle', () => {
        expect(hasCycleUsingReturnArchs(digraphWithCycle)).toBe(true)
      })

      it('digraphWithoutCycle should not have a cycle', () => {
        expect(hasCycleUsingReturnArchs(digraphWithoutCycle)).toBe(false)
      })
    })

    // describe('has circle (using colors)', () => {
    //   it('digraphWithCycle should has a cycle', () => {
    //     expect(hasCycleUsingReturnArchs(digraphWithCycle)).toBe(true)
    //   })

    //   it('digraphWithoutCycle should not have a cycle', () => {
    //     expect(hasCycleUsingReturnArchs(digraphWithoutCycle)).toBe(false)
    //   })
    // })
  })
})
