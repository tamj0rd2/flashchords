var React = require('react')


var ChordGroup = React.createClass({
  propTypes: {
    class: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
  },
  render: function () {
    return (
      <div className={this.props.class}>
        <div className="inline-checkbox">
          <label className="checkbox">
          <input type="checkbox"/> {this.props.options[0]}
          </label>
        </div>
        <div className="inline-checkbox">
          <label className="checkbox">
            <input type="checkbox"/> {this.props.options[1]}
          </label>
        </div>
        <div className="inline-checkbox">
          <label className="checkbox">
            <input type="checkbox"/> {this.props.options[2]}
          </label>
        </div>
        <div className="inline-checkbox">
          <label className="checkbox">
            <input type="checkbox"/> {this.props.options[3]}
          </label>
        </div>
      </div>
    )
  }
})

var Settings = React.createClass({
  render: function () {
    return (
      <div className="settings">
        <ChordGroup class="std-chords" options={['maj', 'min', 'dim', 'aug']}/>
        <ChordGroup class="7th-chords" options={['7th', '9th', '11th', '13th']}/>
        <div className="mode-select">
          <button className="btn btn-default">Change Mode</button>
          <p>Mode Name</p>
          <p>00:00</p>
        </div>
      </div>
    )
  }
})

module.exports = Settings
