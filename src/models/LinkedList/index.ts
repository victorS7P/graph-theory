import { LinkedListNode, LinkedListData } from './Node'

export class LinkedList {
  private _head: LinkedListNode

  public constructor (headData: string) {
    this._head = new LinkedListNode(headData)
  }

  public get size (): number {
    let count = 0
    let node = this._head

    while (node) {
      count++
      if (node.next) {
        node = node.next
      }
    }

    return count
  }

  public get last (): LinkedListNode {
    let lastNode = this._head
    if (lastNode) {
      while (lastNode.next) {
        lastNode = lastNode.next
      }
    }
    return lastNode
  }
  public append (data: LinkedListData): void {
    this.last.append(data)
  }

  public hasNodeWithData (data: LinkedListData): boolean {
    let lastNode = this._head

    if (lastNode.next) {
      lastNode = lastNode.next

      while (lastNode.next) {
        if (lastNode.data === data) {
          break
        }

        lastNode = lastNode.next
      }
    }

    return (lastNode.data === data)
  }

  public get connectedNodes (): number[] {
    let nodes: number[] = []
    let current = this._head

    while (current.next) {
      nodes = [ ...nodes, Number(current.next.data) ]
      current = current.next
    }

    return nodes
  }

  public toString (): string {
    let node = this._head
    let str = this._head.data || ''
  
    while (node.next) {
      str += ` > ${node.next.data}`
      node = node.next
    }

    return str
  }
}
