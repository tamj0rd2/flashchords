var QA = require('../scripts/qa.jsx')
var tonal = require('tonal')

var helpers = {
  isUnique: function (getVal) {
    var lastVal, newVal
    for(var i = 0; i < 50; i++) {
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

describe('QA', function () {

  describe('midiToNote', function () {
    it('should convert a midi value to a note', function () {
      var note = QA.midiToNote(60)
      expect(note).toEqual('C')
    })
  })

  describe('roots', function () {
    var roots = QA.roots
    it('should start at C and end at B', function () {
      expect(roots[0]).toBe('C')
      expect(roots[roots.length - 1]).toBe('B')
    })
    it('should contain 12 values', function () {
      expect(roots.length).toBe(12)
    })
  })

  describe('randRoot', function () {
    it('should return a root note', function () {
      var root = QA.randRoot()
      expect(QA.roots).toContain(root)
    })
    it('should not return the same root twice in a row', function () {
      helpers.isUnique(QA.randRoot)
    })
  })

  describe('randChordName', function () {
    it('should return a chord name', function () {
      var chordName = QA.randChordName()
      expect(tonal.chord.names()).toContain(chordName)
    })
    it('should not return the same name twice in a row', function () {
      helpers.isUnique(QA.randChordName)
    })
  })

  describe('newQuestion', function () {
    it('should return a dict with a type, tonic and answer', function () {
      var result = QA.newQuestion()
      expect(typeof(result)).toBe('object')
      expect(QA.roots).toContain(result.tonic)
      expect(QA.chords.all).toContain(result.type)
      expect(result.answer).not.toEqual('')
    })
    it('should only return chords that have answers', function () {
      var result
      for(var i = 0; i < 100; i++) {
        result = QA.newQuestion().answer
        if (result.length === 0) {
          expect(result.length).not.toEqual(0)
          break
        }
      }
    })
  })
})
