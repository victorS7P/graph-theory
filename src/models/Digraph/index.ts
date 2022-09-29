import { Graph } from '@models/Graph'

export enum ARCH_TYPES {
  ARBORESCENCE = 'ARBORESCENCE',
  DESCENDANT = 'DESCENDANT',
  RETURN = 'RETURN',
  CROSS = 'CROSS',
  NONE = 'NONE'
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

  public getArch (from: number, to: number): ARCH_TYPES {
    if (!this.isDFSForest()) {
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
}
