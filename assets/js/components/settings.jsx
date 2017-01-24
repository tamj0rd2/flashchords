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
    // passes the new value for the checkbox to the parent component
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
    // sets default values that the checkboxes will use
    var checkboxVals = R.repeat(false, QA.CHORD_GROUPS.length - 1)
    checkboxVals.push(true)
    return checkboxVals
  },
  checkboxCallback: function (boxIndex, newState) {
    // get the current checkbox values and update the array with the
    // clicked checkbox's new value
    var newVals = this.state.checkboxVals
    newVals[boxIndex] = newState
    this.setState({checkboxVals: newVals})
    // do something with the new checkbox values (in App.jsx)
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
              callback={this.checkboxCallback}
              checked={this.state.checkboxVals[index]}
              text={text}
           />
  },
  render: function () {
    return (
      <div className={this.state.settingsClass}>
        <div className="heading" onClick={this.showSettings}>Settings</div>
        <div className="settingsContent">
          <div className="groupSelect">
            {QA.CHORD_GROUPS.map(this.createCheckboxes)}
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Settings
