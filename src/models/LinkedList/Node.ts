export type LinkedListData = string | null

export class LinkedListNode {
  private _data: LinkedListData
  private _next?: LinkedListNode

  public constructor (data: LinkedListData) {
    this._data = data
    this._next = undefined
  }

  public get next (): LinkedListNode | undefined {
    return this._next
  }

  public get data (): LinkedListData {
    return this._data
  }

  public append (data: LinkedListData): void {
    this._next = new LinkedListNode(data)
  }
}
