import { Graph } from '@models/Graph'
import { Digraph } from '@models/Digraph'

describe('Exercises 01', () => {
  describe('Graph', () => {
    const g = new Graph(5)
    g.connectNodes(1, 5)
    g.connectNodes(2, 5)

    describe('node grade', () => {
      it('Graph g node 1 grade should be 1', () => {
        expect(g.getNodeGrade(1)).toBe(1)
      })

      it('Graph g node 5 grade should be 2', () => {
        expect(g.getNodeGrade(5)).toBe(2)
      })
    })

    describe('equals', () => {
      it('Graphs g and gNotEqual shouldnt be equal', () => {
        const gNotequal = new Graph(5)
        gNotequal.connectNodes(1, 5)

        expect(g.equalsTo(gNotequal)).toBe(false)
      })

      it('Graphs g and gEqual should be equal', () => {
        const gEqual = new Graph(5)
        gEqual.connectNodes(1, 5)
        gEqual.connectNodes(2, 5)

        expect(g.equalsTo(gEqual)).toBe(true)
      })
    })

    describe('from file', () => {
      it('Should print matriz representation properly', async () => {
        const gFromFile = await Graph.FromFile('graph.txt')
        const str = gFromFile.toString()

        expect(str.split('\n')).toEqual([
          '[ 0 1 0 0 0 1 ]',
          '[ 1 0 0 1 0 1 ]',
          '[ 0 0 0 0 1 0 ]',
          '[ 0 1 0 0 1 1 ]',
          '[ 0 0 1 1 0 0 ]',
          '[ 1 1 0 1 0 0 ]',
          ''
        ])
      })

      it('Should print list representation properly', async () => {
        const gFromFile = await Graph.FromFile('graph.txt')
        expect(gFromFile.linkedLists.map(l => l.toString())).toEqual([
          '1 > 2 > 6',
          '2 > 1 > 4 > 6',
          '3 > 5',
          '4 > 2 > 5 > 6',
          '5 > 3 > 4',
          '6 > 1 > 2 > 4'
        ])
      })
    })
  })

  describe('Digraph', () => {
    const d = new Digraph(5)
    d.connectNodes(2, 3)
    d.connectNodes(1, 5)
    d.connectNodes(1, 3)
    d.connectNodes(5, 1)

    describe('node grade', () => {
      it('Digraph d node 1 grade should be 3', () => {
        expect(d.nodeGrade(1)).toBe(3)
      })

      it('Digraph d node 3 grade should be 2', () => {
        expect(d.nodeGrade(3)).toBe(2)
      })
    })

    describe('join grade', () => {
      it('Digraph d node 1 join grade should be 1', () => {
        expect(d.joinGrade(1)).toBe(1)
      })

      it('Digraph d node 5 join grade should be 1', () => {
        expect(d.joinGrade(5)).toBe(1)
      })
    })

    describe('exit grade', () => {
      it('Digraph d node 1 exit grade should be 2', () => {
        expect(d.exitGrade(1)).toBe(2)
      })

      it('Digraph d node 3 exit grade should be 0', () => {
        expect(d.exitGrade(3)).toBe(0)
      })
    })

    describe('from file', () => {
      it('Should print matriz representation properly', async () => {
        const dFromFile = await Digraph.FromFile('graph.txt')
        const str = dFromFile.toString()

        expect(str.split('\n')).toEqual([
          '[ 0 1 0 0 0 1 ]',
          '[ 1 0 0 0 0 1 ]',
          '[ 0 0 0 0 1 0 ]',
          '[ 0 1 0 0 0 1 ]',
          '[ 0 0 0 1 0 0 ]',
          '[ 0 0 0 0 0 0 ]',
          ''
        ])
      })

      it('Should print list representation properly', async () => {
        const dFromFile = await Digraph.FromFile('graph.txt')
        expect(dFromFile.linkedLists.map(l => l.toString())).toEqual([
          '1 > 2 > 6',
          '2 > 1 > 6',
          '3 > 5',
          '4 > 2 > 6',
          '5 > 4',
          '6'
        ])
      })
    })

    describe('source node', () => {
      it('Digraph d node 3 shouldn\'t be a source', () => {
        expect(d.isSource(3)).toBe(false)
      })

      it('Digraph d node 2 should be a source', () => {
        expect(d.isSource(2)).toBe(true)
      })
    })

    describe('end node', () => {
      it('Digraph d node 2 shouldn\'t be a end', () => {
        expect(d.isEnd(2)).toBe(false)
      })

      it('Digraph d node 3 should be a end', () => {
        expect(d.isEnd(3)).toBe(true)
      })
    })

    describe('is simetric', () => {
      it('Digraph d shouldn\'t be simetric', () => {
        expect(d.isSimetric()).toBe(false)
      })

      it('Digraph dSimetric should be simetric', () => {
        const dSimetric = new Digraph(3)
        dSimetric.connectNodes(1, 2)
        dSimetric.connectNodes(1, 3)
        dSimetric.connectNodes(2, 1)
        dSimetric.connectNodes(2, 3)
        dSimetric.connectNodes(3, 1)
        dSimetric.connectNodes(3, 2)

        expect(dSimetric.isSimetric()).toBe(true)
      })
    })
  })
})
