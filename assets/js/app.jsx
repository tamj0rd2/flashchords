var React = require('react')
var Settings = require('./components/settings')
var QA = require('./scripts/qa.jsx')
var R = require('ramda')

require('../css/app.scss')
require('../css/card.scss')
require('../css/checkbox.scss')


var App = React.createClass({
  getInitialState: function () {
    return R.merge(this.getInitialCardState(), this.initialSettingsState())
  },
  getInitialCardState: function () {
    // filter by chord group
    let selection
    if (this.state) {
      selection = this.state.checkboxVals
    }

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
    }
  },
  resetCard: function () {
    this.setState(this.getInitialCardState())
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
    // get the current checkbox values and update the array with the
    // clicked checkbox's new value
    var newVals = this.state.checkboxVals
    newVals[boxIndex] = newState
    this.setState({checkboxVals: newVals})
    this.resetCard()
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
        />
      </div>
    )
  }
})

module.exports = App
