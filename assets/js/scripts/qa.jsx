const R = require('ramda')
const randInt = require('random-int')
const tonal = require('tonal')


// a list of all possible root notes
const ROOTS = (function () {
  let result = []
  let naturalRoots = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  naturalRoots.forEach(natural => {
    result.push(`${natural}b`, natural, `${natural}#`)
  })
  return result
})()
const ALL_CHORDS = tonal.chord.names()

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

function chordGenFromArr (arr, lastVal) {
  // function that generates a random chord from an array of chords
  // the chord will always be different from the last
  let newVal
  do {
    newVal = arr[randInt(arr.length - 1)]
  }
  while (newVal === lastVal)
  return newVal
}

let lastRoot

// returns a random root note
function randRoot() {
  let newRoot = chordGenFromArr(ROOTS, lastRoot)
  lastRoot = newRoot
  return newRoot
}

let lastChordName

// generates a random chord
function randChordName(selection) {

  // don't filter chords if a selection isn't given or All Chords is selected
  if (!selection || selection.pop()) {
    return chordGenFromArr(ALL_CHORDS, lastChordName)
  }

  // put together a list of acceptable chords
  let chords = []
  for (let i = 0; i < selection.length; i++) {
    if (selection[i]) {
      chords.push(CHORD_GROUPS[i])
    }
  }
  chords = R.flatten(chords)
  return chordGenFromArr(chords, lastChordName)
}

// return a random chord, e.g CmMaj7
function newQuestion(selection) {
  let tonic = randRoot()
  let type = randChordName(selection)
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
  CHORD_GROUPS,
  filterChords,
}
