const R = require('ramda')
const rand = require('unique-random')
const randArr = require('unique-random-array')
const tonal = require('tonal')


const MIDI_START = 60
const MIDI_END = 71
const ROOTS = R.range(MIDI_START, MIDI_END + 1).map(note => midiToNote(note))
const ALL_CHORDS = tonal.chord.names()

// Contains lists of all of the chord difficulty groups
const CHORD_GROUPS = new function () {
  this.all = ALL_CHORDS

  // Major and minor chords
  let group1Reg = [/^M$/, /^m$/]
  this.group1 = filterChords(group1Reg)
  let exclude = this.group1

  // Diminished, augmented, sustained (sus2, sus4, sus24), added
  let group2Reg = [
    /^o$/,
    /^M#5$/,
    /^sus24|Msus\d$/,
    /^(?:(?!7).)*add(?:#|b)*\d*$/,
  ]
  this.group2 = R.without(exclude, filterChords(group2Reg))
  exclude = exclude.concat(this.group2)

  // Other easy chords with 4/5/6s
  let group3Reg = [
    /^(?:m|M)?(?:(?!7|9|11|13)\d)+$/,
    /^(?:m|M)(?:b|#)\d$/
  ]
  this.group3 = R.without(exclude, filterChords(group3Reg))
  exclude = exclude.concat(this.group3)

  // Sevens (Maj7, 7, m7, mMaj7, m7b5, o7)
  let group4Reg = [/^o?7$|^(?!7)m?(?:Maj)?7(?:b5)?$/]
  this.group4 = R.without(exclude, filterChords(group4Reg))
  exclude = exclude.concat(this.group4)

  // Other 7s, basic 9/11/13s
  let group5Reg = [
    /^o(?:(?:m|M)?7)+$/,
    /^(?:m|M)?(?:Maj|M)?(?:7|9|11|13)(?:b5)?$/
  ]
  this.group5 = R.without(exclude, filterChords(group5Reg))
  exclude = exclude.concat(this.group5)

  // 7/9/11/13s which include only one sharp/flat
  let group6Reg = [/^(?:m|M)?(?:Maj|M)?(?:7|9|11|13)(?:(?:#|b)\d+)$/]
  this.group6 = R.without(exclude, filterChords(group6Reg))
  exclude = exclude.concat(this.group6)

  // Everything that hasn't been categorised above
  this.group7 = R.without(exclude, filterChords())

  this.allGroups = [
    this.group1, this.group2, this.group3, this.group4, this.group5,
    this.group6, this.group7
  ]
}

// returns an array of chords that match the given regexes
function filterChords(regArr) {
  if (!regArr || regArr.length === 0) return ALL_CHORDS
  let chords = ALL_CHORDS.filter(chord => {
    for (let regex of regArr) {
      if (R.test(regex, chord.trim())) {
        return chord
      }
    }
  })
  return R.uniq(chords)
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
  let tonic = randRoot()
  let type = randChordName()
  return {
    tonic,
    type,
    answer: tonal.chord.get(type, tonic)
  }
}

module.exports = {
  ROOTS,
  newQuestion,
  randRoot,
  randChordName,
  midiToNote,
  CHORD_GROUPS,
  filterChords,
}
