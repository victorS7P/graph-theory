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

type DFSCallback = (node: number, stack: Array<number>) => void

export function getDFSPathStack (graph: Graph, start: number, end: number, callbacks?: {
  onPush?: DFSCallback
  onPop?: DFSCallback
  onDiscoverConnecteds?: (connectedNodes: Array<number>, stack: Array<number>) => void
}): number[] {
  const stack = [start]
  const visited = [start]

  let connectedNodes: number[]

  do {
    connectedNodes = graph.getConnectedNodes(stack[stack.length - 1])
    if (callbacks?.onDiscoverConnecteds) {
      callbacks.onDiscoverConnecteds(connectedNodes, stack)
    }

    connectedNodes = connectedNodes.filter(n => !visited.includes(n))

    if (connectedNodes.length == 0) {
      const removedNode = stack.pop()

      if (callbacks?.onPop && removedNode) {
        callbacks.onPop(removedNode, stack)
      }
    } else {
      const nextNode = connectedNodes.pop() as number
      
      stack.push(nextNode)
      visited.push(nextNode)
      
      if (callbacks?.onPush) {
        callbacks.onPush(nextNode, stack)
      }

      if (nextNode === end) {
        break
      }
    }
  } while (stack.length)
  
  return stack
}
