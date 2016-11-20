var React = require('react')


var Settings = React.createClass({
  render: function () {
    return (
      <div className="settings">
        <div className="std-chords">
          <div className="inline-checkbox">
            <label className="checkbox">
            <input type="checkbox"/> min
            </label>
          </div>
          <div className="inline-checkbox">
            <label className="checkbox">
              <input type="checkbox"/> maj
            </label>
          </div>
          <div className="inline-checkbox">
            <label className="checkbox">
              <input type="checkbox"/> dim
            </label>
          </div>
          <div className="inline-checkbox">
            <label className="checkbox">
              <input type="checkbox"/> aug
            </label>
          </div>
        </div>
        <div className="7th-chords">
          <div className="inline-checkbox">
            <label className="checkbox">
              <input type="checkbox"/> 7<sup>th</sup>
            </label>
          </div>
          <div className="inline-checkbox">
            <label className="checkbox">
              <input type="checkbox"/> 9<sup>th</sup>
            </label>
          </div>
          <div className="inline-checkbox">
            <label className="checkbox">
              <input type="checkbox"/> 11<sup>th</sup>
            </label>
          </div>
          <div className="inline-checkbox">
            <label className="checkbox">
              <input type="checkbox"/> 13<sup>th</sup>
            </label>
          </div>
        </div>
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
