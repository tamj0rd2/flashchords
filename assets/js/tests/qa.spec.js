var QA = require('../scripts/qa.jsx')
var tonal = require('tonal')

describe('QA', function () {

  describe('getAnswer', function () {
    it('should return an array of notes when given a chord name', function () {
      var question, expected, answer
      question = {type: 'm', tonic: 'C'}
      expected = ['C', 'Eb', 'G']
      answer = QA.getAnswer(question.type, question.tonic)
      expect(answer).toEqual(expected)

      question = {type: '', tonic: 'A'}
      expected = ['A', 'C#', 'E']
      answer = QA.getAnswer(question.type, question.tonic)
      expect(answer).toEqual(expected)

      question = {type: '11b9', tonic: 'D'}
      expected = ['D', 'A', 'C', 'Eb', 'G']
      answer = QA.getAnswer(question.type, question.tonic)
      expect(answer).toEqual(expected)
    })
  })

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
      var lastRoot, newRoot
      for(var i = 0; i < 50; i++) {
        newRoot = QA.randRoot()
        if (lastRoot === newRoot) {
          expect(lastRoot).not.toEqual(newRoot)
          break
        }
        lastRoot = newRoot
      }
    })
  })

  describe('randChordName', function () {
    it('should return a chord name', function () {
      var chordName = QA.randChordName()
      expect(tonal.chord.names()).toContain(chordName)
    })
    it('should not return the same name twice in a row', function () {
      var lastChord, newChord
      for(var i = 0; i < 50; i++) {
        newChord = QA.randChordName()
        if (lastChord === newChord) {
          expect(lastChord).not.toEqual(newChord)
          break
        }
        lastChord = newChord
      }
    })
  })

  describe('newQuestion', function () {
    it('should return an array with a type, tonic and answer', function () {
      var question = QA.newQuestion()
      expect(QA.roots).toContain(question.tonic)
      expect(QA.chordNames).toContain(question.type)
      expect(question.answer).not.toEqual('')
    })
    it('should return a dict', function () {
      var output = QA.newQuestion()
      expect(typeof(output)).toBe('object')
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
