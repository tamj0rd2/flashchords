var React = require('react')
var Settings = require('./components/settings')
var Card = require('./components/card')

var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-6"><Settings /></div>
          <div className="col-xs-6"><Card /></div>
        </div>
      </div>
    )
  }
})

module.exports = App
