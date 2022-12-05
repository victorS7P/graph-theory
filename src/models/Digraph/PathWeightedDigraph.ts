import { Digraph } from '.'

export class PathWeightedDigraph extends Digraph {
  protected _weights: Map<string, Map<string, number>> = new Map()

  public constructor (nodes: number) {
    super(nodes)
    
    for (let i = 1; i <= nodes; i++) {
      this._weights[i.toString()] = new Map()
    }
  }

  public connectNodesWieght (a: number, b: number, w: number): void {
    this.connectNodes(a, b)
    this._weights[a][b] = w
  }

  public getPathWeight (a: number, b: number): number {
    return this._weights[a][b]
  }
}
