import fs from 'fs/promises'

import { LinkedList } from '@models/LinkedList'

export type GraphArray = boolean[][]

export class Graph {
  protected _nodes: number
  protected _matriz: GraphArray

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

  // isSimpleCycle(nodes = [], useLkl = false) {
  //   const startIsEnd = nodes[0] === nodes[nodes.length - 1]
  //   const noDuplicates = (new Set(nodes).size === (nodes.length - 1)) && startIsEnd
  //   return (noDuplicates && this.isCycle(nodes, useLkl)) ? 1 : 0
  // }

  // connectedNodes(node, useLkl = false) {
  //   if (useLkl) {
  //     this.getLkl()
  //   }

  //   return this.mtz[node - 1]
  //     .map(
  //       (connected, i) => (
  //         connected ? (i + 1) : 0
  //       )
  //     )
  //     .filter(n => n > 0)
  // }

  // getPath(a, b, useLkl = false, visited = [], path = []) {
  //   if (a === b) {
  //     return [...path, b]
  //   }

  //   const currentPath = [...path, a]

  //   const connectedNodes = this.connectedNodes(a)
  //     .filter(n => !visited.includes(n))

  //   let pathToReturn = []
  //   connectedNodes.forEach(node => {
  //     const nextPath = this.getPath(node, b, useLkl, [...visited, a], currentPath)
  //     if (nextPath.length > currentPath.length) {
  //       pathToReturn = nextPath
  //     }
  //   })

  //   return pathToReturn
  // }

  // hasPathDFS(a, b, useLkl = false) {
  //   return this.getPath(a, b, useLkl).length ? 1 : 0
  // }

  // printMtz() {
  //   console.log(this.mtz)
  // }

  // printLkl() {
  //   this.getLkl().map(l => l.print())
  // }
}
