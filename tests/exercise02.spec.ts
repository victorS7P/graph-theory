import { Graph } from '@models/Graph'
import { ARCH_TYPES, Digraph } from '@models/Digraph'

import {
  getDFSPathArray,
  getDFSPathLinkedList,
  hasDFSPathArray,
  hasDFSPathLinkedList,
  isCycleArray,
  isCycleLinkedList,
  isSimpleCycleLinkedList,
  isSimpleCyrcleArray,
  getDFSPathStack
} from '@exercises/02'

describe('Exercises 02', () => {
  describe('Graph', () => {
    const g = new Graph(5)
    g.connectNodes(1, 5)
    g.connectNodes(5, 3)
    g.connectNodes(3, 2)
    g.connectNodes(3, 1)
    g.connectNodes(2, 1)

    describe('Using Array', () => {
      describe('is circle', () => {
        it('Graph g nodes [1, 5, 3, 2, 1] should compose a cycle', () => {
          expect(isCycleArray(g, [1, 5, 3, 2, 1])).toBe(true)
        })

        it('Graph g nodes [1, 4, 3, 1] should not compose a cycle', () => {
          expect(isCycleArray(g, [1, 4, 3, 1])).toBe(false)
        })
      })

      describe('is simple circle', () => {
        it('Graph g nodes [1, 5, 3, 1] should compose a simple cycle', () => {
          expect(isSimpleCyrcleArray(g, [1, 5, 3, 2, 1])).toBe(true)
        })

        it('Graph g nodes [1, 5, 3, 5, 1] should not compose a simple cycle', () => {
          expect(isSimpleCyrcleArray(g, [1, 5, 3, 5, 1])).toBe(false)
        })
      })

      describe('has path DFS', () => {
        it('nodes 3 and 2 should have a path', () => {
          expect(hasDFSPathArray(g, 3, 2, [], [])).toBe(true)
        })

        it('nodes 3 and 4 should have a path', () => {
          expect(hasDFSPathArray(g, 3, 4, [], [])).toBe(false)
        })
      })
    })

    describe('Using Linked List', () => {
      describe('is circle', () => {
        it('Graph g nodes [1, 5, 3, 2, 1] should compose a cycle', () => {
          expect(isCycleLinkedList(g, [1, 5, 3, 2, 1])).toBe(true)
        })

        it('Graph g nodes [1, 4, 3, 1] should not compose a cycle', () => {
          expect(isCycleLinkedList(g, [1, 4, 3, 1])).toBe(false)
        })
      })

      describe('is simple circle', () => {
        it('Graph g nodes [1, 5, 3, 1] should compose a simple cycle', () => {
          expect(isSimpleCycleLinkedList(g, [1, 5, 3, 2, 1])).toBe(true)
        })

        it('Graph g nodes [1, 5, 3, 5, 1] should not compose a simple cycle', () => {
          expect(isSimpleCycleLinkedList(g, [1, 5, 3, 5, 1])).toBe(false)
        })
      })

      describe('has path DFS', () => {
        it('nodes 3 and 2 should have a path', () => {
          expect(hasDFSPathLinkedList(g, 3, 2, [], [])).toBe(true)
        })

        it('nodes 3 and 4 should have a path', () => {
          expect(hasDFSPathLinkedList(g, 3, 4, [], [])).toBe(false)
        })
      })
    })
  })

  describe('Digraph', () => {
    const d = new Digraph(5)
    d.connectNodes(1, 3)
    d.connectNodes(1, 2)
    d.connectNodes(3, 4)
    d.connectNodes(4, 5)
    d.connectNodes(5, 3)

    describe('Using Array', () => {
      describe('is circle', () => {
        it('Digraph d nodes [3, 4, 5, 3] should compose a cycle', () => {
          expect(isCycleArray(d, [3, 4, 5, 3])).toBe(true)
        })

        it('Digraph d nodes [1, 3, 4, 1] should not compose a cycle', () => {
          expect(isCycleArray(d, [1, 3, 4, 1])).toBe(false)
        })
      })

      describe('has path DFS', () => {
        it('nodes 1 and 5 should have a path', () => {
          expect(hasDFSPathArray(d, 1, 5, [], [])).toBe(true)
        })

        it('nodes 3 and 1 should have a path', () => {
          expect(hasDFSPathArray(d, 3, 1, [], [])).toBe(false)
        })
      })

      describe('get DFS path', () => {
        it('Digraph d nodes 1 and 5 path should be [1, 3, 4, 5]', () => {
          expect(getDFSPathArray(d, 1, 5, [], [])).toEqual([1, 3, 4, 5])
        })

        it('Digraph d nodes 1 and 2 path should be [1, 2]', () => {
          expect(getDFSPathArray(d, 1, 2, [], [])).toEqual([1, 2])
        })

        it('Digraph d nodes 3 and 2 path should be []', () => {
          expect(getDFSPathArray(d, 3, 2, [], [])).toEqual([])
        })
      })
    })

    describe('Using Linked List', () => {
      describe('is circle', () => {
        it('Digraph d nodes [3, 4, 5, 3] should compose a cycle', () => {
          expect(isCycleLinkedList(d, [3, 4, 5, 3])).toBe(true)
        })

        it('Digraph d nodes [1, 3, 4, 1] should not compose a cycle', () => {
          expect(isCycleLinkedList(d, [1, 3, 4, 1])).toBe(false)
        })
      })

      describe('has path DFS', () => {
        it('nodes 1 and 5 should have a path', () => {
          expect(hasDFSPathLinkedList(d, 1, 5, [], [])).toBe(true)
        })

        it('nodes 3 and 1 should have a path', () => {
          expect(hasDFSPathLinkedList(d, 3, 1, [], [])).toBe(false)
        })
      })

      describe('get DFS path', () => {
        it('Digraph d nodes 1 and 5 path should be [1, 3, 4, 5]', () => {
          expect(getDFSPathLinkedList(d, 1, 5, [], [])).toEqual([1, 3, 4, 5])
        })

        it('Digraph d nodes 1 and 2 path should be [1, 2]', () => {
          expect(getDFSPathLinkedList(d, 1, 2, [], [])).toEqual([1, 2])
        })

        it('Digraph d nodes 3 and 2 path should be []', () => {
          expect(getDFSPathLinkedList(d, 3, 2, [], [])).toEqual([])
        })
      })
    })

    describe('Using Stack', () => {
      describe('get DFS path', () => {
        it('Digraph d nodes 1 and 5 path should be [1, 3, 4, 5]', () => {
          expect(getDFSPathStack(d, 1, 5)).toEqual([1, 3, 4, 5])
        })

        it('Digraph d nodes 1 and 2 path should be [1, 2]', () => {
          expect(getDFSPathStack(d, 1, 2)).toEqual([1, 2])
        })

        it('Digraph d nodes 3 and 2 path should be []', () => {
          expect(getDFSPathStack(d, 3, 2)).toEqual([])
        })
      })
    })

    describe('Arborescence / DFS forest', () => {
      const arborescence = new Digraph(6)
      arborescence.connectNodes(1, 3)
      arborescence.connectNodes(1, 4)
      arborescence.connectNodes(3, 5)
      arborescence.connectNodes(3, 2)
      arborescence.connectNodes(5, 6)

      const dfsForest = new Digraph(8)
      dfsForest.connectNodes(1, 6)
      dfsForest.connectNodes(6, 8)
      dfsForest.connectNodes(6, 3)
      dfsForest.connectNodes(3, 2)
      dfsForest.connectNodes(4, 5)
      dfsForest.connectNodes(4, 7)

      it('Digraph arborescence should be an arborescence', () => {
        expect(arborescence.isArborescence()).toBe(true)
      })

      it('Digraph dfsForest should be an arborescence', () => {
        expect(dfsForest.isArborescence()).toBe(false)
      })

      it('Digraph dfsForest should be a DFS foresct', () => {
        expect(dfsForest.isDFSForest()).toBe(true)
      })

      describe('DFS forest archs', () => {
        it('Digraph dfsForest arch (4, 5) type shoulb be ARBORESCENCE', () => {
          expect(dfsForest.getArch(4, 5)).toBe(ARCH_TYPES.ARBORESCENCE)
        })

        it('Digraph dfsForest arch (1, 8) type shoulb be DESCENDANT', () => {
          expect(dfsForest.getArch(1, 8)).toBe(ARCH_TYPES.DESCENDANT)
        })

        it('Digraph dfsForest arch (2, 6) type shoulb be RETURN', () => {
          expect(dfsForest.getArch(2, 6)).toBe(ARCH_TYPES.RETURN)
        })

        it('Digraph dfsForest arch (1, 5) type shoulb be CROSS', () => {
          expect(dfsForest.getArch(1, 5)).toBe(ARCH_TYPES.CROSS)
        })

        it('Digraph dfsForest arch (7, 5) type shoulb be CROSS', () => {
          expect(dfsForest.getArch(7, 5)).toBe(ARCH_TYPES.CROSS)
        })
      })
    })
  })
})
