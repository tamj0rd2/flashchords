var QA = require('../scripts/qa.jsx')

describe('QA', function () {

  describe('getAnswer', function () {
    it('should return an array of notes when given a chord name', function () {
      var question = 'C'
      var expected = ['C', 'E', 'G']
      var answer = QA.getAnswer(question)
      expect(answer).toEqual(expected)
    })
  })
})
