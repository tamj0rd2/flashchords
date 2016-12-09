var R = require('ramda')
var rand = require('unique-random')
var randArr = require('unique-random-array')
var tonal = require('tonal')


const MIDI_START = 60
const MIDI_END = 71
const ROOTS = R.range(MIDI_START, MIDI_END + 1).map(note => midiToNote(note))
const ALL_CHORDS = tonal.chord.names()

// Contains lists of all of the chord difficulty groups
const CHORD_GROUPS = new function () {
  this.all = ALL_CHORDS

  // Major and minor chords
  this.group1 = filterChords([])

  // Diminished, augmented, sustained (sus2, sus4, sus24), added
  this.group2 = filterChords([])

  // Sevens (Maj7, 7, m7, mMaj7, m7b5, o7)
  this.group3 = filterChords([])

  // Other basic 7s. All basic 9s, 11s and 13s. All add 7/9/11/13s
  this.group4 = filterChords([])

  // Everything that hasn't been categorised above
  this.group5 = filterChords([])

  // All groups in an array
  this.allGroups = [
    this.group1, this.group2, this.group5, this.group4, this.group5, this.all
  ]
}

// returns an array of chords that match the given regexes
function filterChords(regArr) {
  if (!regArr || regArr.length === 0) return ALL_CHORDS
  return ALL_CHORDS.filter(chord => {
    for (var regex of regArr) {
      if (R.test(regex, chord.trim())) {
        return chord
      }
    }
  })
}

const randRootGen = rand(MIDI_START, MIDI_END)
// generates a random chord from a list of chords
const randChordName = randArr(CHORD_GROUPS.all)

// converts a midi integer value to a note
function midiToNote(note) {
  return tonal.note.pc(tonal.note.fromMidi(note))
}

// returns a root note
function randRoot() {
  return midiToNote(randRootGen())
}

// returns a random chord, e.g CmMaj7
function newQuestion() {
  var tonic = randRoot()
  var type = randChordName()
  return {
    tonic: tonic,
    type: type,
    answer: tonal.chord.get(type, tonic)
  }
}

module.exports = {
  ROOTS: ROOTS,
  newQuestion: newQuestion,
  randRoot: randRoot,
  randChordName: randChordName,
  midiToNote: midiToNote,
  CHORD_GROUPS: CHORD_GROUPS,
  filterChords: filterChords,
}
