var React = require('react')
var Settings = require('./components/settings')
var QA = require('./scripts/qa.jsx')
var R = require('ramda')
var naturalSort = require('string-natural-compare')

require('../css/app.scss')
require('../css/card.scss')


var App = React.createClass({
  getInitialState: function () {
    return R.merge(this.getInitialCardState(), this.initialSettingsState())
  },
  getInitialCardState: function (selection) {
    return {
      question: QA.newQuestion(selection),
      answerText: 'Flip',
      answerClass: 'cardBtn answer'
    }
  },
  initialSettingsState: function () {
    // make 'all chords' the default chord group selection
    var checkboxVals = R.repeat(false, QA.CHORD_GROUPS.length - 1)
    checkboxVals.push(true)

    return {
      checkboxVals,
      settingsClass: 'settings',
      selectedChords: this.determineSelectedChords(checkboxVals)
    }
  },
  determineSelectedChords: function (checkboxVals) {
    let selection = checkboxVals || this.state.checkboxVals
    let chords = []

    if (R.last(selection)) {
      chords = R.last(QA.CHORD_GROUPS)
    } else {
      checkboxVals.forEach((value, index) => {
        if (value) {
          chords.push(QA.CHORD_GROUPS[index])
        }
      })
    }

    return R.dropRepeats(R.flatten(chords)).sort(naturalSort).join(', ')
  },
  resetCard: function (a, b, selection) {
    selection = selection || this.state.checkboxVals
    this.setState(this.getInitialCardState(selection))
  },
  showAnswer: function () {
    // shows the answer and makes relevant class name change
    this.setState({answerText: this.state.question.answer.join(', ')})
    this.setState({answerClass: 'cardBtn answer flipped'})
  },
  showSettings: function () {
    if (this.state.settingsClass === 'settings') {
      this.setState({settingsClass: 'settings active'})
    } else {
      this.setState({settingsClass: 'settings'})
    }
  },
  handleCheckboxClick: function (boxIndex, newState) {
    /* updates the checkboxVals state, the selected chords and
     * resets the card
     */

    // use slice to create copy of the checkboxvals array
    let newVals = this.state.checkboxVals.slice(0)
    let allChordsIndex = newVals.length - 1
    newVals[boxIndex] = newState

    // if everything is now unselected, select AllChords
    if (R.all(R.equals(false), newVals)) {
      newVals[allChordsIndex] = true
    } // if all chords gets chosen, deselect everything else
    else if (newState && boxIndex === allChordsIndex) {
      newVals = R.repeat(false, QA.CHORD_GROUPS.length - 1)
      newVals.push(true)
    } // deselect AllChords if another box was ticked
    else if (newState && boxIndex !== allChordsIndex) {
      newVals[allChordsIndex] = false
    }

    this.setState({checkboxVals: newVals})
    this.setState({selectedChords: this.determineSelectedChords(newVals)})
    this.resetCard(undefined, undefined, newVals)
  },
  render: function() {
    return (
      <div className="container">
        <div className="card">
          <div className="cardBtn question" onClick={this.resetCard}>
            <strong>{this.state.question.tonic}</strong>
            {this.state.question.type}
          </div>
          <div className={this.state.answerClass} onClick={this.showAnswer}>
            {this.state.answerText}
          </div>
        </div>
        <Settings
          checkboxVals={this.state.checkboxVals}
          handleCheckboxClick={this.handleCheckboxClick}
          showSettings={this.showSettings}
          settingsClass={this.state.settingsClass}
          selectedChords={this.state.selectedChords}
        />
      </div>
    )
  }
})

module.exports = App
