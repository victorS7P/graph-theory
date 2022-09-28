import { Graph } from '@models/Graph'

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
}
