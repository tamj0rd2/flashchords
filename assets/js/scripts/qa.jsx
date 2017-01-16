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

// TODO: refactor randRoot and randChordName to use same gen function

let lastRoot

// returns a random root note that is different from the last
function randRoot() {
  let newRoot
  do {
    newRoot = ROOTS[randInt(ROOTS.length - 1)]
  }
  while (newRoot === lastRoot)
  lastRoot = newRoot
  return newRoot
}

let lastChordName

// generates a random chord from a list of chords and must be
// different from the last
function randChordName(selection) {

  // function that generates a random chord from an array
  let chordGen = (arr) => {
    let newChordName
    do {
      newChordName = arr[randInt(arr.length - 1)]
    }
    // if the chord is the same as the lastChordName, try again
    while (newChordName === lastChordName)
    lastChordName = newChordName
    return newChordName
  }

  // don't filter chords if a selection isn't given or All Chords is selected
  if (!selection || selection.pop()) {
    return chordGen(ALL_CHORDS)
  }

  // put together a list of acceptable chords
  let chords = []
  for (let i = 0; i < selection.length; i++) {
    if (selection[i]) {
      chords.push(CHORD_GROUPS[i])
    }
  }
  chords = R.flatten(chords)
  return chordGen(chords)
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
