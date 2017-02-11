var React = require('react')
var R = require('ramda')
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
      id: newId(),
      tooltip: QA.CHORD_GROUPS[this.props.index].join(', ')
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
    handleCheckboxClick: React.PropTypes.func.isRequired,
    showSettings: React.PropTypes.func.isRequired,
    settingsClass: React.PropTypes.string.isRequired,
    checkboxVals: React.PropTypes.array.isRequired,
    selectedChords: React.PropTypes.string.isRequired
  },
  createCheckbox: function (group, index) {
    let text
    if (index === QA.CHORD_GROUPS.length - 1) {
      text = 'All'
    }
    return (
      <ChordCheckbox
        key={index}
        index={index}
        callback={this.props.handleCheckboxClick}
        checked={this.props.checkboxVals[index]}
        text={text}
      />
    )
  },
  render: function () {
    return (
      <div className={this.props.settingsClass}>
        <div className="heading" onClick={this.props.showSettings}>Settings</div>
        <div className="settingsContent">
          <div className="groupSelect">
            {QA.CHORD_GROUPS.map(this.createCheckbox)}
          </div>
          <div className="selectedChords">
            <span className="selectedHeading">Selected Chords: </span>
            {this.props.selectedChords}
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Settings
