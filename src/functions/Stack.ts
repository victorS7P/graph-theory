import { Graph } from '@models/Graph'
import { Digraph } from '@models/Digraph'

type DFSCallback = (node: number, stack: Array<number>) => void

export class StackFunctions {
  public static getDFSPath (graph: Graph, start: number, end: number, callbacks?: {
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

  public static hasCycle (digraph: Digraph): boolean {
    let hasCycle = false

    for (const node of digraph.nodesList) {
      StackFunctions.getDFSPath(
        digraph,
        node,
        -1,
        {
          onDiscoverConnecteds: (connectedNodes, stack) => {
            hasCycle = (stack.some(n => connectedNodes.includes(n))) || hasCycle
          }
        }
      )

      if (hasCycle) {
        break
      }
    }

    return hasCycle
  }
}
