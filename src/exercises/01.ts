import assert from 'assert'

import { Graph } from '@models/Graph'
import { Digraph } from '@models/Digraph'

export class Exercises01 {
  public async run (): Promise<void> {
    const g = new Graph(5)
    g.connectNodes(1, 5)
    g.connectNodes(2, 5)

    assert(
      g.getNodeGrade(1),
      'Graph g node 1 grade should be 1'
    )

    assert(
      g.getNodeGrade(5) === 2,
      'Graph g node 5 grade should be 2'
    )

    const d = new Digraph(5)
    d.connectNodes(2, 3)
    d.connectNodes(1, 5)
    d.connectNodes(1, 3)
    d.connectNodes(5, 1)

    assert(
      d.nodeGrade(1) === 3,
      'Digraph d node 1 grade should be 3'
    )

    assert(
      d.nodeGrade(3) === 2,
      'Digraph d node 3 grade should be 2'
    )

    assert(
      d.joinGrade(1),
      'Digraph d node 1 join grade should be 1'
    )

    assert(
      d.joinGrade(5),
      'Digraph d node 5 join grade should be 1'
    )

    assert(
      d.exitGrade(1) === 2,
      'Digraph d node 1 exit grade should be 2'
    )

    assert(
      !d.exitGrade(3),
      'Digraph d node 3 exit grade should be 0'
    )

    const g2 = new Graph(5)
    g2.connectNodes(1, 5)

    assert(
      g.equalsTo(g2) === false,
      'Graphs g and g2 shouldnt be equal'
    )

    g2.connectNodes(2, 5)
    assert(
      g.equalsTo(g2) === true,
      'Graphs g and g2 should be equal'
    )

    const g3 = await Graph.FromFile('graph.txt')

    console.log('Matriz Representation (file graph):')
    console.log(g3.toString())
    console.log()

    console.log('List Representation (file graph):')
    g3.linkedLists.map(l => console.log(l.toString()))
    console.log()

    const g4 = await Digraph.FromFile('graph.txt')

    console.log('Matriz Representation (file digraph):')
    console.log(g4.toString())
    console.log()

    console.log('List Representation (file digraph):')
    g4.linkedLists.map(l => console.log(l.toString()))
    console.log()

    assert(
      !g4.isSource(6),
      'Digraph g4 node 6 shouldn\'t be a source'
    )

    assert(
      g4.isSource(3),
      'Digraph g4 node 3 should be a source'
    )

    assert(
      !g4.isEnd(3),
      'Digraph g4 node 3 shouldn\'t be an end'
    )

    assert(
      g4.isEnd(5),
      'Digraph g4 node 5 should be an end'
    )

    assert(
      !g4.isSimetric(),
      'Digraph g4 shouldn\'t be simetric'
    )

    const g5 = new Digraph(3)
    g5.connectNodes(1, 2)
    g5.connectNodes(1, 3)
    g5.connectNodes(2, 1)
    g5.connectNodes(2, 3)
    g5.connectNodes(3, 1)
    g5.connectNodes(3, 2)

    assert(
      g5.isSimetric(),
      'Digraph g5 should be simetric'
    )
  }
}
