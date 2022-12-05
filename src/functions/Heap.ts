export class Heap {
  public heap: (number|null)[] = [null]

  public getNode (node: number): number {
    return Number(this.heap[node])
  }

  public insert (node: number): void {
    this.heap.push(node)

    if (this.heap.length > 1) {
      let current = this.heap.length - 1

      while (current > 1 && this.getNode(Math.floor(current / 2)) > this.getNode(current)) {
        [this.heap[Math.floor(current / 2)], this.heap[current]] = [this.heap[current], this.heap[Math.floor(current / 2)]]
        current = Math.floor(current / 2)
      }
    }
  }

  public remove (): (number|null) {
    const smallest = this.heap[1]

    let current = 1
    let leftChildIndex = current * 2
    let rightChildIndex = current * 2 + 1

    if (this.heap.length > 2) {
      this.heap[1] = this.heap[this.heap.length - 1]
      this.heap.splice(this.heap.length - 1)

      if (this.heap.length === 3) {
        if (this.getNode(1) > this.getNode(2)) {
          [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]]
        }

        return smallest
      }

      while (this.heap[leftChildIndex] &&
        this.heap[rightChildIndex] &&
        (this.getNode(current) > this.getNode(leftChildIndex) ||
          this.getNode(current) > this.getNode(rightChildIndex))) {
        if (this.getNode(leftChildIndex) < this.getNode(rightChildIndex)) {
          [this.heap[current], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[current]]
          current = leftChildIndex
        } else {
          [this.heap[current], this.heap[rightChildIndex]] = [this.heap[rightChildIndex], this.heap[current]]
          current = rightChildIndex
        }

        leftChildIndex = current * 2
        rightChildIndex = current * 2 + 1
      }
    }

    if (this.heap[rightChildIndex] === undefined && this.getNode(leftChildIndex) < this.getNode(current)) {
      [this.heap[current], this.heap[leftChildIndex]] = [this.heap[leftChildIndex], this.heap[current]]
    }

    else if (this.heap.length === 2) {
      this.heap.splice(1, 1)
    } else {
      return null
    }

    return smallest
  }
}
