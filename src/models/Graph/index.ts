import fs from 'fs/promises'

import { LinkedList } from '@models/LinkedList'
import { LinkedListFunctions } from '@functions/LinkedList'

export type GraphArray = boolean[][]

export class Graph {
  protected _nodes: number
  protected _matriz: GraphArray

  public get nodesList (): number[] {
    return new Array(this._nodes).fill(1).map((_, i) => i + 1)
  }

  public get linkedLists (): LinkedList[] {
    return this._matriz.map(
      (connections, a) => {
        const linkedList = new LinkedList(`${a + 1}`)

        connections.forEach(
          (isConnected, b) => {
            if (isConnected) {
              linkedList.append(`${b + 1}`)
            }
          }
        )

        return linkedList
      }
    )
  }

  public get connections (): number[][] {
    const connections: number[][] = []

    this._matriz.forEach((_, a) => {
      this._matriz.forEach((_, b) => {
        if (this._matriz[a][b]) { connections.push([a+1, b+1]) }
      })
    })

    return connections
  }

  public constructor (nodes: number) {
    this._nodes = Number(nodes)
    this._matriz = new Array(nodes).fill(0).map(() => (
      new Array(nodes).fill(false)
    ))
  }

  public static async FromFile (file: string): Promise<Graph> {
    const filePath = `${process.cwd()}/src/data/${file}`
    const data = await fs.readFile(filePath, 'utf8')
    const lines = data.split('\n')

    const V = parseInt(lines[0])
    const A = Number(lines[1])

    const graph = new this(V)
    for (let i = 0; i < A; i++) {
      const nodes = lines[i + 2]
      const [a, b] = nodes.split(' ').map(Number)
      graph.connectNodes(a + 1, b + 1)
    }

    return graph
  }

  public connectNodes (a: number, b: number): void {
    this._matriz[a - 1][b - 1] = true
    this._matriz[b - 1][a - 1] = true
  }

  public disconnectNodes (a: number, b: number): void {
    this._matriz[a - 1][b - 1] = false
    this._matriz[b - 1][a - 1] = false
  }

  public hasConnection (a: number, b: number): boolean {
    return this._matriz[a - 1][b - 1] === true
  }

  public getNodeGrade (node: number): number {
    return (
      this._matriz.reduce(
        (prev, cur) => (
          prev + (cur[node - 1] ? 1 : 0)
        ), 0
      )
    )
  }

  public equalsTo (graph: Graph): boolean {
    return this._matriz.every(
      (row, x) => (
        row.every(
          (isConnected, y) => (
            isConnected === graph.hasConnection(x + 1, y + 1)
          )
        )
      )
    )
  }

  public toString (): string {
    return this._matriz.reduce(
      (str: string, connections: boolean[]) => (
        str += `[ ${
          connections.reduce(
            (connectionStr: string, isConnected: boolean) => (
              connectionStr += (isConnected ? '1 ' : '0 ')
            ), ''
          )
        }]\n`
      ), ''
    )
  }

  public getConnectedNodes (node: number): number[] {
    return this._matriz[node - 1]
      .map(
        (connected, i) => (
          connected ? (i + 1) : 0
        )
      )
      .filter(n => n > 0)
  }

  public hasOtherPathBesidesDirect (start: number, end: number): boolean {
    const clone = this.clone(this)
    clone.disconnectNodes(start, end)
    return LinkedListFunctions.hasDFSPath(clone, start, end, [], [])
  }

  public hasCycle (): boolean {
    const nodes = this.nodesList
    let hasCycle = false

    for (const node of nodes) {
      for (const adjascentNode of this.getConnectedNodes(node)) {
        if (this.hasOtherPathBesidesDirect(adjascentNode, node)) {
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

  public clone (graph: Graph): Graph {
    const copy = new Graph(graph._nodes)
    graph.connections.forEach(([a, b]) => {
      copy.connectNodes(a, b)
    })

    return copy
  }
}
