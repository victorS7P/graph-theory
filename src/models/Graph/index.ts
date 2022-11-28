import fs from 'fs/promises'

import { LinkedList } from '@models/LinkedList'
import { LinkedListFunctions } from '@functions/LinkedList'
import { StackFunctions } from '@functions/Stack'

export type GraphArray = boolean[][]

export enum BIPARTITE_COLOR {
  RED = 'red',
  BLUE = 'blue'
}

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

  public static fromLetCode886 (n: number, dislikes: Array<Array<number>>): Graph {
    const graph = new Graph(n)
    dislikes.forEach(d => {
      graph.connectNodes(d[0] + 1, d[1] + 1)
    })
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

  public hasSameNodes (graph: Graph): boolean {
    return this.nodesList.some(n => graph.nodesList.includes(n))
  }

  public hasSameConnections (graph: Graph): boolean {
    return this.connections.every(
      c => graph.connections.some(a => (
        a[0] === c[0] && a[1] === c[1]
      ))
    )
  }

  public hasAllNodes (graph: Graph): boolean {
    return graph.nodesList.every(n => this.nodesList.includes(n))
  }

  public isSubgraph (graph: Graph): boolean {
    return graph.hasSameNodes(this) && graph.hasSameConnections(this)
  }

  public isGeneratorSubgraph (graph: Graph): boolean {
    return this.isSubgraph(graph) && graph.hasAllNodes(this)
  }

  public inducedGraph (nodes: Array<number>): Graph {
    if (nodes.length <= 1) {
      throw 'cant create graph wiht only one node'
    }

    if (!nodes.some(n => this.nodesList.includes(n))) {
      throw 'cant create graph wiht nodes that doesnt exist'
    }

    const induced = new Graph(nodes.sort((a, b) => a - b).reverse()[0])

    this.connections.forEach(c => {
      if (nodes.includes(c[0]) && nodes.includes(c[1])) {
        induced.connectNodes(c[0], c[1])
      }
    })

    if (induced.connections.length === 0) {
      throw 'cant create graph without connections'
    }

    return induced
  }
  
  public getAllOnComponent (node: number): Array<number> {
    const allOnComponent = [node]

    for (const node of allOnComponent) {
      const connecteds = this.getConnectedNodes(node)
      allOnComponent.push(...connecteds.filter(c => !allOnComponent.includes(c)))
    }

    return allOnComponent
  }

  public componentsNumber (): number {
    let componentsNumber = 0
    const visited: Array<number> = []

    for (const node of this.nodesList) {
      if (!visited.includes(node)) {
        componentsNumber++
        const allOnComponent = this.getAllOnComponent(node)
        visited.push(...allOnComponent)
      }
    }

    return componentsNumber
  }

  public isConnected (): boolean {
    return (this.componentsNumber() === 1)
  }

  public bipartiteInfo (): { isBipartite: boolean, partitions: Array<Array<number>> } {
    if (this._nodes % 2 === 1) {
      return {
        isBipartite: false,
        partitions: []
      }
    }

    let isBipartite = true
    const coloredNodes: Map<'string', {
      data: string,
      color: BIPARTITE_COLOR
    }> = new Map()

    this.nodesList.forEach(node => {
      coloredNodes[node.toString()] = {
        data: node.toString(),
        color: undefined
      }
    })

    for (const node of this.nodesList) {
      if (!coloredNodes[node.toString()].color) {
        coloredNodes[node.toString()] = {
          data: node.toString(),
          color: BIPARTITE_COLOR.RED
        }
      }

      StackFunctions.getDFSPath(this, node, -1, {
        onDiscoverConnecteds: (connecteds, stack) => {
          if (connecteds.some(n => coloredNodes[n].color === coloredNodes[stack[stack.length - 1]].color)) {
            isBipartite = false
          } else {
            connecteds.forEach(n => {
              coloredNodes[n] = {
                data: n.toString(),
                color: coloredNodes[stack[stack.length - 1]].color === BIPARTITE_COLOR.RED ? BIPARTITE_COLOR.BLUE : BIPARTITE_COLOR.RED
              }
            })
          }
        }
      })
    }

    const partitions: Array<Array<number>> = []
    if (isBipartite) {
      partitions[0] = this.nodesList.filter(node => coloredNodes[node].color === BIPARTITE_COLOR.RED)
      partitions[1] = this.nodesList.filter(node => coloredNodes[node].color === BIPARTITE_COLOR.BLUE)
    }

    return {
      isBipartite,
      partitions
    }
  }
}
