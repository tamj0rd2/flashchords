var React = require('react')
var QA = require('../scripts/qa.jsx')


var ChordCheckbox = React.createClass({
  propTypes: {
    index: React.PropTypes.number.isRequired,
    callback: React.PropTypes.func.isRequired,
    text: React.PropTypes.string,
    checked: React.PropTypes.bool.isRequired
  },
  handleChange: function (e) {
    var newState = e.target.checked
    this.props.callback(this.props.index, newState)
  },
  render: function () {
    return (
      <div className="col-xs-3">
        <label className="checkbox-inline">
          <input type="checkbox" onChange={this.handleChange}
                 checked={this.props.checked}
          />
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
      <div className="mode-select">
        <div className="input-group">
          <span className="input-group-btn">
            <button className="btn btn-primary" onClick={this.onBtnClick}>
              Change Mode
            </button>
          </span>
          <input disabled type="text" className="form-control text-center"
                 value={this.state.mode + ' Mode'}/>
        </div>
        <div className={this.state.timerClass}><strong>00:00</strong></div>
      </div>
    )
  }
})

var Settings = React.createClass({
  propTypes: {
    callback: React.PropTypes.func.isRequired
  },
  generateCheckboxVals: function () {
    var checkboxVals = []
    for (let i = 0; i < QA.CHORD_GROUPS.allGroups.length; i++) {
      checkboxVals.push(false)
    }
    checkboxVals.push(true)
    return checkboxVals
  },
  getInitialState: function () {
    return {
      checkboxVals: this.generateCheckboxVals()
    }
  },
  cbCallback: function (boxIndex, newState) {
    var newVals = this.state.checkboxVals
    newVals[boxIndex] = newState
    this.setState({checkboxVals: newVals})
    this.props.callback(newVals)
  },
  createCheckboxes: function (group, index) {
    return <ChordCheckbox key={index}
                          index={index}
                          callback={this.cbCallback}
                          checked={this.state.checkboxVals[index]}
           />
  },
  render: function () {
    var modes = ['Standard', 'Cheat', 'Timed']
    var allIndex = QA.CHORD_GROUPS.allGroups.length
    return (
      <div className="settings">
        <div>
          {QA.CHORD_GROUPS.allGroups.map(this.createCheckboxes)}
          <ChordCheckbox key={allIndex}
                         index={allIndex}
                         text="All chords"
                         callback={this.cbCallback}
                         checked={this.state.checkboxVals[allIndex]}
          />
        </div>
        <ModeSelector modes={modes}/>
      </div>
    )
  }
})

module.exports = Settings
