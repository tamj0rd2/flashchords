var React = require('react')
var Settings = require('./components/settings')
var Card = require('./components/card')

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Settings />
        <Card />
      </div>
    )
  }
})

module.exports = App
