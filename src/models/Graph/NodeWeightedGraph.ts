import { Graph } from '.'

export class NodeWeightedGraph extends Graph {
  protected _weights: number[]

  public constructor (nodes: number, weights: number[]) {
    super(nodes)
    this._weights = weights
  }

  public getPathWeight (a: number, b: number): number {
    return this._weights[a - 1] + this._weights[b - 1]
  }

  public getNodeWeight (a: number): number {
    return this._weights[a - 1]
  }
}
