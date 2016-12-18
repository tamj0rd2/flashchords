const R = require('ramda')
const rand = require('unique-random')
const randArr = require('unique-random-array')
const tonal = require('tonal')


const MIDI_START = 60
const MIDI_END = 71

// Gets a list of all root notes
const ROOTS = R.range(MIDI_START, MIDI_END + 1).map(note => midiToNote(note))
const ALL_CHORDS = tonal.chord.names()

// returns a function to generate a random root note
const randRootGen = rand(MIDI_START, MIDI_END)

// generates a random chord from a list of chords
const randChordName = randArr(ALL_CHORDS)

// An array that contains lists of all of the chord difficulty groups
const CHORD_GROUPS = (() => {
  let regexGroups = [
    // Major and minor chords
    [
      /^M$/,
      /^m$/
    ],
    // Diminished, augmented, sustained (sus2, sus4, sus24), added
    [
      /^o$/,
      /^M#5$/,
      /^sus24|Msus\d$/,
      /^(?:(?!7).)*add(?:#|b)*\d*$/,
    ],
    // Other easy chords with 4/5/6s
    [
      /^(?:m|M)?(?:(?!7|9|11|13)\d)+$/,
      /^(?:m|M)(?:b|#)\d$/
    ],
    // Sevens (Maj7, 7, m7, mMaj7, m7b5, o7)
    [
      /^o?7$|^(?!7)m?(?:Maj)?7(?:b5)?$/
    ],
    // Other 7s and basic 9/11/13s
    [
      /^o(?:(?:m|M)?7)+$/,
      /^(?:m|M)?(?:Maj|M)?(?:7|9|11|13)(?:b5)?$/
    ],
    // 7/9/11/13s which include one sharp or flat
    [
      /^(?:m|M)?(?:Maj|M)?(?:7|9|11|13)(?:(?:#|b)\d+)$/
    ],
  ]
  let chordGroups = []
  let excludedChords = []

  regexGroups.forEach(regexArr => {
    // exclude chords that are already grouped, because some regex groups
    // aren't specific enough and can cause duplicates. The chord groups must
    // be completely unique
    let matchingChords = R.without(excludedChords, filterChords(regexArr))
    chordGroups.push(matchingChords)
    excludedChords = excludedChords.concat(matchingChords)
  })

  let allOtherChords = R.without(excludedChords, filterChords())
  chordGroups.push(allOtherChords)
  chordGroups.push(ALL_CHORDS)

  return chordGroups
})()


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
