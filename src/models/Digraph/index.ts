import { StackFunctions } from '@functions/Stack'
import { Graph } from '@models/Graph'

export enum ARCH_TYPES {
  ARBORESCENCE = 'ARBORESCENCE',
  DESCENDANT = 'DESCENDANT',
  RETURN = 'RETURN',
  CROSS = 'CROSS',
  NONE = 'NONE'
}

export enum NODE_DFS_COLOR {
  WHITE = 'not visited',
  GRAY = 'processing',
  BLACK = 'processed'
}

interface DFSForestNodeInterface {
  data: string,
  parent: string | null,
  started: number,
  ended: number
}

type DFSForestNodeInfo = Map<'string', DFSForestNodeInterface>

export class Digraph extends Graph {
  public static async FromFile (file: string): Promise<Digraph> {
    return await super.FromFile(file) as Digraph
  }

  public connectNodes (a: number, b: number): void {
    this._matriz[a - 1][b - 1] = true
  }

  public nodeGrade (node: number): number {
    return (
      this.joinGrade(node) + this.exitGrade(node)
    )
  }

 public joinGrade (node: number): number {
    return (
      this._matriz.map(
        origin => origin[node - 1]
      ).reduce(
        (prev, cur) => (
          prev + (cur ? 1 : 0)
        ), 0
      )
    )
  }

  public exitGrade (node: number): number {
    return (
      this._matriz[node - 1].reduce(
        (prev, cur) => (
          prev + (cur ? 1 : 0)
        ), 0
      )
    )
  }

  public isSource (node: number): boolean {
    return this.exitGrade(node) > 0
  }

  public isEnd (node: number): boolean {
    return this.joinGrade(node) > 0
  }

  public isSimetric (): boolean {
    return this._matriz.every(
      (row, a) =>
        row.every(
          (c, b) =>
            (c && a != b)
              ? this._matriz[b][a]
              : true
        )
    )
  }

  public getArborescenceRoots (): number[] {
    return this.nodesList.filter(node => this.joinGrade(node) === 0)
  }

  public isArborescence (): boolean {
    const hasOnlyOneRoot = this.getArborescenceRoots().length === 1

    const hasMoreThanOneJoin = this.nodesList.some(node => this.joinGrade(node) > 1)
    const allHasAPath = this.nodesList.every(node => this.nodeGrade(node) > 0)

    return (hasOnlyOneRoot && !hasMoreThanOneJoin && allHasAPath)
  }

  public isDFSForest (): boolean {
    const hasRoots = this.getArborescenceRoots().length > 0
    const hasMoreThanOneJoin = this.nodesList.some(node => this.joinGrade(node) > 1)

    return (hasRoots && !hasMoreThanOneJoin)
  }

  public getDFSForestInfo (): DFSForestNodeInfo {
    let DFSForestInfo: DFSForestNodeInfo = new Map()

    const roots = this.getArborescenceRoots()
    let count = 0

    roots.forEach(root => {
      const stack = [root]
      const visited = [root]

      DFSForestInfo[root.toString()] = {
        data: root.toString(),
        parent: null,
        started: count++,
        ended: 0
      }

      let connectedNodes: number[]
      do {
        connectedNodes = this.getConnectedNodes(stack[stack.length - 1])
        connectedNodes = connectedNodes.filter(n => !visited.includes(n))

        if (connectedNodes.length == 0) {
          const lastNode = stack.pop() as number

          DFSForestInfo = {
            ...DFSForestInfo,
            [lastNode.toString()]: {
              ...DFSForestInfo[lastNode.toString()],
              ended: count++ 
            }
          }
        } else {
          const nextNode = connectedNodes.pop() as number

          DFSForestInfo[nextNode.toString()] = {
            data: nextNode.toString(),
            parent: stack[stack.length - 1].toString(),
            started: count++,
            ended: 0
          }

          stack.push(nextNode)
          visited.push(nextNode)
        }
      } while (stack.length)
    })

    return DFSForestInfo
  }

  public getArch (from: number, to: number, useDFSForest = true): ARCH_TYPES {
    if (useDFSForest && !this.isDFSForest()) {
      return ARCH_TYPES.NONE
    }

    const dfsInfo = this.getDFSForestInfo()
    const { started: from_start, ended: from_ended } = dfsInfo[from.toString()] as DFSForestNodeInterface
    const { started: to_start, ended: to_end, parent: to_parent } = dfsInfo[to.toString()] as DFSForestNodeInterface

    if (
      from_start < to_start
      && to_start < to_end
      && to_end < from_ended
      && to_parent === from.toString()
    ) {
      return ARCH_TYPES.ARBORESCENCE
    }
    
    else if (
      from_start < to_start
      && to_start < to_end
      && to_end < from_ended
      && to_parent !== from.toString()
    ) {
      return ARCH_TYPES.DESCENDANT
    }
    
    else if (
      to_start < from_start
      && from_start < from_ended
      && from_ended < to_end
    ) {
      return ARCH_TYPES.RETURN
    }

    return ARCH_TYPES.CROSS
  }

  public getAllArchs (): Array<{
    from: number,
    to: number,
    arch: ARCH_TYPES
  }> {
    return this._matriz.flatMap((_, from) => (
      this._matriz[from].flatMap((_, to) => from === to
        ? []
        : ({
          from, to,
          arch: this.getArch(from + 1, to + 1, false)
        })
      )
    ))
  }

  public hasCycleUsingReturnArchs (): boolean {
    return this.getAllArchs().some(
      ({ from, to, arch }) => (
        arch === ARCH_TYPES.RETURN && this.hasConnection(from + 1, to + 1)
      )
    )
  }

  public clone (digraph: Digraph): Digraph {
    const copy = new Digraph(digraph._nodes)
    digraph.connections.forEach(([a, b]) => {
      copy.connectNodes(a, b)
    })

    return copy
  }

  public hasCycleUsingColors (): boolean {
    let hasCycle = false

    const coloredNodes: Map<'string', {
      data: string,
      color: NODE_DFS_COLOR
    }> = new Map()

    this.nodesList.forEach(node => {
      coloredNodes[node.toString()] = {
        data: node.toString(),
        color: NODE_DFS_COLOR.WHITE
      }
    })

    const roots = this.getArborescenceRoots()
    for (const node of roots) {
      coloredNodes[node.toString()] = {
        data: node.toString(),
        color: NODE_DFS_COLOR.GRAY
      }

      StackFunctions.getDFSPath(this, node, -1, {
        onPush: (n) => {
          coloredNodes[n.toString()] = {
            data: n.toString(),
            color: NODE_DFS_COLOR.GRAY
          }
        },
        onPop: (n) => {
          coloredNodes[n.toString()] = {
            data: n.toString(),
            color: NODE_DFS_COLOR.BLACK
          }
        },
        onDiscoverConnecteds: (c) => {
          hasCycle = (c.some(n => coloredNodes[n].color === NODE_DFS_COLOR.GRAY)) || hasCycle
        }
      })

      coloredNodes[node.toString()] = {
        data: node.toString(),
        color: NODE_DFS_COLOR.BLACK
      }
    }

    return hasCycle
  }

  public topologicalOrder (): Array<number> {
    if (this.hasCycleUsingReturnArchs()) { return [] }

    const dfsInfo = this.getDFSForestInfo()
    const endedInfo = [] as Array<{ node: string, end: number }>

    for (const node in dfsInfo) {
      endedInfo.push({
        node,
        end: dfsInfo[node].ended
      })
    }

    return endedInfo.sort((a, b) => b.end - a.end).map(n => Number(n.node))
  }

  public stronglyConnectedComponents (): Array<Array<number>> {
    const stronglyConnectedComponents: Array<Array<number>> = []

    const order: Array<number> = []
    for (const node of this.nodesList) {
      if (!order.includes(node)) {
        StackFunctions.getDFSPath(this, node, -1, {
          onPop: n => {
            if (!order.includes(n)) {
              order.push(n)
            }
          }
        })
      }
    }

    const transposed = new Digraph(this._nodes)
    this.connections.forEach(([a, b]) => {
      transposed.connectNodes(b, a)
    })

    const visited: Array<number> = []
    let nextComponent: Array<number> = []

    for (const node of order.reverse()) {
      if (!visited.includes(node)) {
        nextComponent = []

        StackFunctions.getDFSPath(transposed, node, -1, {
          onPop: n => {
            if (!nextComponent.includes(n)) {
              nextComponent.push(n)
            }

            visited.push(n)
          }
        })

        stronglyConnectedComponents.push(nextComponent)
      }
    }

    return stronglyConnectedComponents
  }
}
