import { ArrayFunctions } from '@functions/Array'
import { LinkedListFunctions } from '@functions/LinkedList'
import { Graph } from '@models/Graph'

describe('Exercises 08', () => {
  describe('Graph', () => {
    const eulerian = new Graph(6)
    eulerian.connectNodes(1, 2)
    eulerian.connectNodes(1, 6)
    eulerian.connectNodes(2, 3)
    eulerian.connectNodes(3, 4)
    eulerian.connectNodes(3, 5)
    eulerian.connectNodes(3, 6)
    eulerian.connectNodes(4, 5)

    const notEulerian = new Graph(4)
    notEulerian.connectNodes(1, 2)
    notEulerian.connectNodes(1, 3)
    notEulerian.connectNodes(1, 4)
    notEulerian.connectNodes(2, 3)
    notEulerian.connectNodes(2, 4)
    notEulerian.connectNodes(3, 4)

    describe('Using Array', () => {
      describe('isEulerian', () => {
        it('Graph eulerian should be eulerian', () => {
          expect(ArrayFunctions.isEulerian(eulerian)).toBe(true)
        })

        it('Graph notEulerian should not be eulerian', () => {
          expect(ArrayFunctions.isEulerian(notEulerian)).toBe(false)
        })
      })

      describe('hasEulerianTrail', () => {
        it('Graph eulerian should have an eulerian trail', () => {
          expect(ArrayFunctions.hasEulerianTrail(eulerian)).toBe(true)
        })

        it('Graph notEulerian should not have an eulerian trail', () => {
          expect(ArrayFunctions.hasEulerianTrail(notEulerian)).toBe(false)
        })
      })
    })

    describe('Using LinkedList', () => {
      describe('isEulerian', () => {
        it('Graph eulerian should be eulerian', () => {
          expect(LinkedListFunctions.isEulerian(eulerian)).toBe(true)
        })

        it('Graph notEulerian should not be eulerian', () => {
          expect(LinkedListFunctions.isEulerian(notEulerian)).toBe(false)
        })
      })

      describe('hasEulerianTrail', () => {
        it('Graph eulerian should have an eulerian trail', () => {
          expect(LinkedListFunctions.hasEulerianTrail(eulerian)).toBe(true)
        })

        it('Graph notEulerian should not have an eulerian trail', () => {
          expect(LinkedListFunctions.hasEulerianTrail(notEulerian)).toBe(false)
        })
      })
    })

    describe('FleuryAlgorithm', () => {
      it('Graph eulerian should return a Euler trail', () => {
        expect(eulerian.FleuryAlgorithm()).toEqual([2, 1, 6, 3, 4, 5, 3, 2])
      })

      it('Graph notEulerian should not return a Euler trail', () => {
        expect(notEulerian.FleuryAlgorithm()).toEqual([])
      })
    })

    describe('HierholzerAlgorithm', () => {
      it('Graph eulerian should return a Euler trail', () => {
        expect(eulerian.HierholzerAlgorithm()).toEqual([1, 6, 3, 5, 4, 3, 2, 1])
      })

      it('Graph notEulerian should not return a Euler trail', () => {
        expect(notEulerian.HierholzerAlgorithm()).toEqual([])
      })
    })

    describe('getSmallerHamiltonianCircuit', () => {
      it('Graph eulerian should not have a hamiltonian circuit', () => {
        expect(eulerian.getSmallerHamiltonianCircuit()).toEqual([])
      })

      it('Graph notEulerian smaller hamiltonian circuit should have 4 connections', () => {
        expect(notEulerian.getSmallerHamiltonianCircuit().length).toEqual(4)
      })
    })
  })
})
