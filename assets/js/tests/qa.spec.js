const QA = require('../scripts/qa.jsx')
const tonal = require('tonal')
const R = require('ramda')

const helpers = {
  // returns true if each generated value is different from the last
  isUnique (getVal) {
    let lastVal, newVal
    for(let i = 0; i < 50; i++) {
      newVal = getVal()
      if (lastVal === newVal) {
        expect(lastVal).not.toEqual(newVal)
        return false
      }
      lastVal = newVal
    }
    return true
  },
  // slices an array (end excluded) then returns the flattened array
  flatSlice (arr, start, end) {
    return R.flatten(R.slice(start, end, arr))
  }
}

describe('QA', () => {
  let allTonalChords = tonal.chord.names()

  describe('ROOTS', () => {
    let roots = QA.ROOTS
    it('should start at Cb and end at B#', () => {
      expect(roots[0]).toBe('Cb')
      expect(roots[roots.length - 1]).toBe('B#')
    })
    it('should contain 21 values (one for each possible root)', () => {
      expect(roots.length).toBe(21)
    })
  })

  describe('randRoot', () => {
    it('should return a root note', () => {
      let root = QA.randRoot()
      expect(QA.ROOTS).toContain(root)
    })
    it('should not return the same root twice in a row', () => {
      helpers.isUnique(QA.randRoot)
    })
  })

  describe('filterChords', () => {
    it('should take an array of regexes and return matching chords', () => {
      let result = QA.filterChords([/^m$/, /^M$/], allTonalChords)
      expect(result).toContain('m')
      expect(result).toContain('M')
      expect(result).not.toContain('M13')
      expect(result).not.toContain('m7')
    })
  })

  describe('randChordName', () => {
    it('should return a chord name', () => {
      let chordName = QA.randChordName()
      expect(tonal.chord.names()).toContain(chordName)
    })
    it('should not return the same name twice in a row', () => {
      helpers.isUnique(QA.randChordName)
    })
    describe('should return all chords if', () => {
      it('s selection is blank', () => {
        let result = QA.randChordName([])
        expect(allTonalChords).toContain(result)
      })
      it('s selection is not given', () => {
        let result = QA.randChordName()
        expect(allTonalChords).toContain(result)
      })
      it('s selection is undefined', () => {
        let selection
        let result = QA.randChordName(selection)
        expect(allTonalChords).toContain(result)
      })
      it('s selection has "All Chords" chosen', () => {
        let selection = R.repeat(false, QA.CHORD_GROUPS.length - 1)
        selection.push(true)

        let result = QA.randChordName(selection)
        expect(allTonalChords).toContain(result)
      })
      it('no groups have been selected', () => {
        let selection = R.repeat(false, QA.CHORD_GROUPS.length)
        let result = QA.randChordName(selection)
        expect(allTonalChords).toContain(result)
      })
    })
    it('should only return chords in the given groups, end exclusive', () => {
      let test = (selection) => {
        let expectedChords = []
        let unexpectedChords = []

        if (selection[selection.length - 1]) {
          expectedChords = allTonalChords
        } else {
          // if "All Chords" isn't selected, make a list of un/acceptable chords
          for (let i = 0; i < selection.length - 1; i++) {
            if (selection[i]) {
              expectedChords.push(QA.CHORD_GROUPS[i])
            } else {
              unexpectedChords.push(QA.CHORD_GROUPS[i])
            }
          }
        }

        let chord = QA.randChordName(selection)
        expect(R.flatten(expectedChords)).toContain(chord)
        expect(R.flatten(unexpectedChords)).not.toContain(chord)
      }

      test([true, false, false, false, false, false, false, false])
      test([false, true, false, true, false, false, false, false])
      test([false, true, false, false, false, false, false, true])
      test([true, false, false, false, false, false, false, true])
      test([true, true, true, true, false, false, false, false])
    })
  })

  describe('newQuestion', () => {
    it('should return a dict with a type, tonic and answer', () => {
      let result = QA.newQuestion()
      expect(typeof(result)).toBe('object')
      expect(QA.ROOTS).toContain(result.tonic)
      expect(allTonalChords).toContain(result.type)
      expect(result.answer).not.toEqual('')
    })
    it('should only return chords that have answers', () => {
      let result
      for(let i = 0; i < 100; i++) {
        result = QA.newQuestion().answer
        if (result.length === 0) {
          expect(result.length).not.toEqual(0)
          break
        }
      }
    })
  })
})
