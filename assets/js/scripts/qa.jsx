var R = require('ramda')
var rand = require('unique-random')
var randArr = require('unique-random-array')
var tonal = require('tonal')


const roots = R.range(60, 72).map(note => midiToNote(note))
const randRootGen = rand(60, 71)
const chordNames = tonal.chord.names()
const randChordName = randArr(chordNames)


function midiToNote(note) {
  return tonal.note.pc(tonal.note.fromMidi(note))
}

function getAnswer(type, tonic) {
  return tonal.chord.get(type, tonic)
}

function randRoot() {
  return midiToNote(randRootGen())
}

function newQuestion() {
  var tonic = randRoot()
  var type = randChordName()
  return {
    tonic: tonic,
    type: type,
    answer: getAnswer(type, tonic)
  }
}

module.exports = {
  roots: roots,
  getAnswer: getAnswer,
  newQuestion: newQuestion,
  randRoot: randRoot,
  randChordName: randChordName,
  midiToNote: midiToNote,
  chordNames: chordNames,
}
