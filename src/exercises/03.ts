import { ARCH_TYPES, Digraph } from '@models/Digraph'
import { Graph } from '@models/Graph'

import { hasDFSPathLinkedList, getDFSPathStack } from './02'

export function hasOtherPathBesidesDirect (graph: Graph, start: number, end: number): boolean {
  const clone = graph.clone
  clone.disconnectNodes(start, end)
  return hasDFSPathLinkedList(clone, start, end, [], [])
}

export function hasCycle (graph: Graph): boolean {
  const nodes = graph.nodesList
  let hasCycle = false

  for (const node of nodes) {
    for (const adjascentNode of graph.getConnectedNodes(node)) {
      if (hasOtherPathBesidesDirect(graph, adjascentNode, node)) {
        hasCycle = true
        break
      }
    }

    if (hasCycle) {
      break
    }
  }

  return hasCycle
}

export function hasCycleUsingStack (digraph: Digraph): boolean {
  let hasCycle = false

  for (const node of digraph.nodesList) {
    getDFSPathStack(
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

export function hasCycleUsingReturnArchs (digraph: Digraph): boolean {
  return digraph.getAllArchs().some(({ arch }) => arch === ARCH_TYPES.RETURN)
}

export enum NODE_DFS_COLOR {
  WHITE = 'not visited',
  GRAY  = 'processing',
  BLACK = 'visited'
}

// export function hasCycleUsingColors (digraph: Digraph): boolean {
//   let hasCycle = false

//   let coloredNodes: Map<'string', {
//     data: string,
//     color: NODE_DFS_COLOR
//   }> = new Map()

//   const roots = digraph.getArborescenceRoots()
//   roots.forEach(root => {
//     coloredNodes[root.toString()] = {
//       data: root.toString(),
//       color: NODE_DFS_COLOR.GRAY
//     }

//     stackDFSArray(
//       this,
//       root,
//       -1,
//       {
//         onPush: (node) => {
//           coloredNodes[node.toString()] = {
//             data: node.toString(),
//             color: NODE_DFS_COLOR.GRAY
//           }
//         },
//         onPop: (node) => {
//           coloredNodes = {
//             ...coloredNodes,
//             [node.toString()]: {
//               data: node.toString(),
//               color: NODE_DFS_COLOR.BLACK
//             }
//           }
//         }
//       }
//     )
//   })

//   return hasCycle
// }
