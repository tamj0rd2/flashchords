var tonal = require('tonal')

function getAnswer(question) {
  return tonal.chord(question)
}

module.exports = {
  getAnswer: getAnswer,
}
