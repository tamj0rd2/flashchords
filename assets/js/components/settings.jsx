var React = require('react')


var ChordCheckbox = React.createClass({
  propTypes: {
    option: React.PropTypes.string.isRequired,
  },
  render: function () {
    if (/^[0-9]+$/.test(this.props.option)) {
      return (
        <div className="col-xs-3">
          <label className="checkbox-inline">
            <input type="checkbox"/> {this.props.option}<sup>th</sup>
          </label>
        </div>
      )
    } else {
      return (
        <div className="col-xs-3">
          <label className="checkbox-inline">
            <input type="checkbox"/> {this.props.option}
          </label>
        </div>
      )
    }
  }
})

var ChordGroup = React.createClass({
  propTypes: {
    class: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
  },
  render: function () {
    return (
      <div className={'row ' + this.props.class}>
        {this.props.options.map((chord, index) =>
          <ChordCheckbox option={chord} key={index}/>
        )}
      </div>
    )
  }
})

var ModeSelector = React.createClass({
  render: function () {
    return (
      <div className="mode-select">
        <button className="btn btn-default">Change Mode</button>
        <p>Mode Name</p>
        <p>00:00</p>
      </div>
    )
  }
})

var Settings = React.createClass({
  render: function () {
    var stdChords = ['maj', 'min', 'dim', 'aug']
    var svnChords = ['7', '9', '11', '13']
    return (
      <div className="settings">
        <ChordGroup class="std-chords" options={stdChords}/>
        <ChordGroup class="7th-chords" options={svnChords}/>
        <ModeSelector/>
      </div>
    )
  }
})

module.exports = Settings
