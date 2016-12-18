const QA = require('../scripts/qa.jsx')
const tonal = require('tonal')

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
}

describe('QA', () => {
  let allTonalChords = tonal.chord.names()

  describe('midiToNote', () => {
    it('should convert a midi value to a note', () => {
      let note = QA.midiToNote(60)
      expect(note).toEqual('C')
    })
  })

  describe('ROOTS', () => {
    let roots = QA.ROOTS
    it('should start at C and end at B', () => {
      expect(roots[0]).toBe('C')
      expect(roots[roots.length - 1]).toBe('B')
    })
    it('should contain 12 values', () => {
      expect(roots.length).toBe(12)
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
