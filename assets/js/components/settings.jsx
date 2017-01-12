var R = require('ramda')
var React = require('react')
var QA = require('../scripts/qa.jsx')
var newId = require('../scripts/newid.js')
require('../../css/settings.scss')


var ChordCheckbox = React.createClass({
  propTypes: {
    index: React.PropTypes.number.isRequired,
    callback: React.PropTypes.func.isRequired,
    text: React.PropTypes.string,
    checked: React.PropTypes.bool.isRequired
  },
  getInitialState: function () {
    return {
      id: newId()
    }
  },
  handleChange: function (e) {
    var newState = e.target.checked
    this.props.callback(this.props.index, newState)
  },
  render: function () {
    return (
      <div className="chordGroup">
        <input type="checkbox"
               className="css-checkbox"
               id={this.state.id}
               onChange={this.handleChange}
               checked={this.props.checked}
        />
        <label htmlFor={this.state.id} className="css-label">
          {this.props.text || 'Group ' + (this.props.index + 1)}
        </label>
      </div>
    )
  }
})

var ModeSelector = React.createClass({
  propTypes: {
    modes: React.PropTypes.array.isRequired,
  },
  getInitialState: function () {
    return {
      modeIndex: 0,
      mode: this.props.modes[0],
      timerClass: 'hidden',
    }
  },
  onBtnClick: function () {
    let mode = this.setMode()
    this.setTimerClass(mode)
  },
  setMode: function () {
    let newModeIndex = (this.state.modeIndex + 1) % this.props.modes.length
    let newMode = this.props.modes[newModeIndex]
    this.setState({modeIndex: newModeIndex})
    this.setState({mode: newMode})
    return newMode
  },
  setTimerClass: function (mode) {
    if (mode === 'Timed') {
      this.setState({timerClass: ''})
    } else {
      this.setState({timerClass: 'hidden'})
    }
  },
  render: function () {
    return (
      <div className="modeControl">
        <button onClick={this.onBtnClick}>Change Mode</button>
        <input disabled type="text" value={this.state.mode + ' Mode'}/>
        <strong>00:00</strong>
      </div>
    )
  }
})

var Settings = React.createClass({
  propTypes: {
    callback: React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {
      checkboxVals: this.generateCheckboxVals(),
      settingsClass: 'settings'
    }
  },
  showSettings: function () {
    if (this.state.settingsClass === 'settings') {
      this.setState({settingsClass: 'settings active'})
    } else {
      this.setState({settingsClass: 'settings'})
    }
  },
  generateCheckboxVals: function () {
    var checkboxVals = R.repeat(false, QA.CHORD_GROUPS.length - 1)
    checkboxVals.push(true)
    return checkboxVals
  },
  cbCallback: function (boxIndex, newState) {
    var newVals = this.state.checkboxVals
    newVals[boxIndex] = newState
    this.setState({checkboxVals: newVals})
    this.props.callback(newVals)
  },
  createCheckboxes: function (group, index) {
    let text
    if (index === QA.CHORD_GROUPS.length - 1) {
      text = 'All Chords'
    }
    return <ChordCheckbox
              key={index}
              index={index}
              callback={this.cbCallback}
              checked={this.state.checkboxVals[index]}
              text={text}
           />
  },
  render: function () {
    var modes = ['Standard', 'Cheat', 'Timed']
    return (
      <div className={this.state.settingsClass}>
        <div className="heading" onClick={this.showSettings}>Settings</div>
        <div className="settingsContent">
          <div className="groupSelect">
            {QA.CHORD_GROUPS.map(this.createCheckboxes)}
          </div>
          {/* <ModeSelector modes={modes}/> */}
        </div>
      </div>
    )
  }
})

module.exports = Settings
