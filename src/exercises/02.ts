import assert from 'assert'

import { Graph } from '@models/Graph'
import { ARCH_TYPES, Digraph } from '@models/Digraph'

export function isCycleArray (graph: Graph, nodes: number[]): boolean {
  return nodes.every(
    (node, i) => {
      return (
        (nodes.length - 1) === i
          ? node === nodes[0]
          : graph.hasConnection(node, nodes[i + 1])
      )
    }
  )
}

export function isCycleLinkedList (graph: Graph, nodes: number[]): boolean {
  return nodes.every(
    (node, i) => (
      (nodes.length - 1) === i
        ? node === nodes[0]
        : graph.linkedLists[node - 1].hasNodeWithData(nodes[i + 1].toString())
    )
  )
}

export function isSimpleCyrcleArray (graph: Graph, nodes: number[]): boolean {
  const startIsEnd = nodes[0] === nodes[nodes.length - 1]
  const noDuplicates = (new Set(nodes).size === (nodes.length - 1)) && startIsEnd
  return (noDuplicates && isCycleArray(graph, nodes))
}

export function isSimpleCycleLinkedList (graph: Graph, nodes: number[]): boolean {
  const startIsEnd = nodes[0] === nodes[nodes.length - 1]
  const noDuplicates = (new Set(nodes).size === (nodes.length - 1)) && startIsEnd
  return (noDuplicates && isCycleLinkedList(graph, nodes))
}

export function getDFSPathArray (graph: Graph, start: number, end: number, visited: number[], path: number[]): number[] {
  if (start === end) {
    return [...path, end]
  }

  const currentPath = [...path, start]
  const connectedNodes = graph.getConnectedNodes(start)
    .filter(n => !visited.includes(n))

  let pathToReturn: number[] = []
  connectedNodes.forEach(node => {
    const nextPath = getDFSPathArray(graph, node, end, [...visited, start], currentPath)
    if (nextPath.length > currentPath.length) {
      pathToReturn = nextPath
    }
  })

  return pathToReturn
}

export function getDFSPathLinkedList (graph: Graph, start: number, end: number, visited: number[], path: number[]): number[] {
  const linkedList = graph.linkedLists[start - 1]

  if (start === end) {
    return [...path, end]
  }

  const currentPath = [...path, start]
  const connectedNodes = linkedList.connectedNodes
    .filter(n => !visited.includes(n))

  let pathToReturn: number[] = []
  connectedNodes.forEach(node => {
    const nextPath = getDFSPathLinkedList(graph, node, end, [...visited, start], currentPath)
    if (nextPath.length > currentPath.length) {
      pathToReturn = nextPath
    }
  })

  return pathToReturn
}

export function hasDFSPathArray (graph: Graph, start: number, end: number, visited: number[], path: number[]): boolean {
  return getDFSPathArray(graph, start, end, visited, path).length > 0
}

export function hasDFSPathLinkedList (graph: Graph, start: number, end: number, visited: number[], path: number[]): boolean {
  return getDFSPathLinkedList(graph, start, end, visited, path).length > 0
}

export function stackDFSArray (graph: Graph, start: number, end: number): number[] {
  const stack = [start]
  const visited = [start]

  let connectedNodes: number[]

  do {
    connectedNodes = graph.getConnectedNodes(stack[stack.length - 1])
    connectedNodes = connectedNodes.filter(n => !visited.includes(n))

    if (connectedNodes.length == 0) {
      stack.pop()
    } else {
      const nextNode = connectedNodes.pop() as number

      stack.push(nextNode)
      visited.push(nextNode)

      if (nextNode === end) {
        break
      }
    }
  } while (stack.length)
  
  return stack
}

export class Exercises02 {
  public async run (): Promise<void> {
    const g = new Graph(5)
    g.connectNodes(1, 5)
    g.connectNodes(5, 3)
    g.connectNodes(3, 2)
    g.connectNodes(3, 1)
    g.connectNodes(2, 1)

    assert(
      isCycleArray(g, [1, 5, 3, 2, 1]),
      'Graph g nodes [1, 5, 3, 2, 1] should compose a cycle'
    )

    assert(
      !isCycleArray(g, [1, 4, 3, 1]),
      'Graph g nodes [1, 4, 3, 1] should not compose a cycle'
    )

    assert(
      isCycleLinkedList(g, [1, 5, 3, 2, 1]),
      'Graph g nodes [1, 5, 3, 2, 1] should compose a cycle (verify using linked list)'
    )

    assert(
      !isCycleLinkedList(g, [1, 4, 3, 1]),
      'Graph g nodes [1, 4, 3, 1] should not compose a cycle (verify using linked list)'
    )

    assert(
      isSimpleCyrcleArray(g, [1, 5, 3, 1]),
      'Graph g nodes [1, 5, 3, 1] should compose a simple cycle'
    )

    assert(
      !isSimpleCyrcleArray(g, [1, 5, 3, 5, 1]),
      'Graph g nodes [1, 5, 3, 5, 1] should not compose a simple cycle'
    )

    assert(
      isSimpleCycleLinkedList(g, [1, 5, 3, 1]),
      'Graph g nodes [1, 5, 3, 1] should compose a simple cycle (verify using linked list)'
    )

    assert(
      !isSimpleCycleLinkedList(g, [1, 5, 3, 5]),
      'Graph g nodes [1, 5, 3, 5] should not compose a cycle (verify using linked list)'
    )

    assert(
      hasDFSPathArray(g, 3, 2, [], []),
      'nodes 3 and 2 should have a path'
    )

    assert(
      !hasDFSPathArray(g, 3, 4, [], []),
      'nodes 3 and 2 should not have a path'
    )

    assert(
      hasDFSPathLinkedList(g, 3, 2, [], []),
      'nodes 3 and 2 should have a path (verify using linked list)'
    )

    assert(
      !hasDFSPathLinkedList(g, 3, 4, [], []),
      'nodes 3 and 4 should not have a path (verify using linked list)'
    )

    const d = new Digraph(5)
    d.connectNodes(1, 3)
    d.connectNodes(1, 2)
    d.connectNodes(3, 4)
    d.connectNodes(4, 5)
    d.connectNodes(5, 3)
    /*	1 --> 3 <-- 5
    /		| 		|     ^
    /		v			v  		|
    /	  2			4 --- |
    */

    assert(
      isCycleArray(d, [3, 4, 5, 3]),
      'Digraph d nodes [3, 4, 5, 3] should compose a cycle'
    )

    assert(
      !isCycleArray(d, [1, 3, 4, 1]),
      'Digraph d nodes [1, 3, 4, 1] should not compose a cycle'
    )

    assert(
      hasDFSPathArray(d, 1, 5, [], []),
      'Digraph d nodes 1 and 5 should have a path'
    )

    assert(
      !hasDFSPathArray(d, 3, 1, [], []),
      'Digraph d nodes 3 and 1 should not have a path'
    )

    assert(
      hasDFSPathLinkedList(d, 1, 5, [], []),
      'Digraph d nodes 1 and 5 should have a path (verify using linked list)'
    )

    assert(
      JSON.stringify(getDFSPathArray(d, 1, 5, [], [])) === JSON.stringify([1, 3, 4, 5]),
      'Digraph d nodes 1 and 5 path should be [1, 3, 4, 5]'
    )

    assert(
      JSON.stringify(getDFSPathArray(d, 1, 2, [], [])) === JSON.stringify([1, 2]),
      'Digraph d nodes 1 and 2 path should be [1, 2]'
    )

    assert(
      JSON.stringify(getDFSPathArray(d, 3, 2, [], [])) === JSON.stringify([]),
      'Digraph d nodes 3 and 2 should not have a path'
    )

    assert(
      JSON.stringify(getDFSPathLinkedList(d, 1, 5, [], [])) === JSON.stringify([1, 3, 4, 5]),
      'Digraph d nodes 1 and 5 path should be [1, 3, 4, 5] (verify using linked list)'
    )

    assert(
      JSON.stringify(getDFSPathLinkedList(d, 1, 2, [], [])) === JSON.stringify([1, 2]),
      'Digraph d nodes 1 and 2 path should be [1, 2] (verify using linked list)'
    )

    assert(
      JSON.stringify(getDFSPathLinkedList(d, 3, 2, [], [])) === JSON.stringify([]),
      'Digraph d nodes 3 and 2 should not have a path (verify using linked list)'
    )

    assert(
      JSON.stringify(stackDFSArray(d, 1, 5)) === JSON.stringify([1, 3, 4, 5]),
      'Digraph d nodes 1 and 5 path should be [1, 3, 4, 5] (verify using stack)'
    )

    assert(
      JSON.stringify(stackDFSArray(d, 1, 2)) === JSON.stringify([1, 2]),
      'Digraph d nodes 1 and 2 path should be [1, 2] (verify using stack'
    )

    assert(
      JSON.stringify(stackDFSArray(d, 3, 2)) === JSON.stringify([]),
      'Digraph d nodes 3 and 2 should not have a path (verify using stack'
    )

    const arborescence = new Digraph(6)
    arborescence.connectNodes(1, 3)
    arborescence.connectNodes(1, 4)
    arborescence.connectNodes(3, 5)
    arborescence.connectNodes(3, 2)
    arborescence.connectNodes(5, 6)

    assert(
      arborescence.isArborescence(),
      'Digraph arborescence should be an arborescence'
    )

    const dfsForest = new Digraph(8)
    dfsForest.connectNodes(1, 6)
    dfsForest.connectNodes(6, 8)
    dfsForest.connectNodes(6, 3)
    dfsForest.connectNodes(3, 2)
    dfsForest.connectNodes(4, 5)
    dfsForest.connectNodes(4, 7)

    assert(
      !dfsForest.isArborescence(),
      'Digraph dfsForest should not be an arborescence'
    )

    assert(
      dfsForest.isDFSForest(),
      'Digraph dfsForest should be a DFS-Forest'
    )

    assert(
      dfsForest.getArch(4, 5) === ARCH_TYPES.ARBORESCENCE,
      'Digraph dfsForest arch (4, 5) type shoulb be ARBORESCENCE'
    )

    assert(
      dfsForest.getArch(1, 8) === ARCH_TYPES.DESCENDANT,
      'Digraph dfsForest arch (1, 8) type shoulb be DESCENDANT'
    )

    assert(
      dfsForest.getArch(2, 6) === ARCH_TYPES.RETURN,
      'Digraph dfsForest arch (2, 6) type shoulb be RETURN'
    )

    assert(
      dfsForest.getArch(1, 5) === ARCH_TYPES.CROSS,
      'Digraph dfsForest arch (1, 5) type shoulb be CROSS'
    )

    assert(
      dfsForest.getArch(7, 5) === ARCH_TYPES.CROSS,
      'Digraph dfsForest arch (7, 5) type shoulb be CROSS'
    )
  }
}
