var React = require('react')
var Settings = require('./components/settings')
var Card = require('./components/card')

var App = React.createClass({
  tempCallback: function(checkboxVals) {
    console.log(`Checkbox values are: [${checkboxVals.join(', ')}]`)
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-6"><Settings callback={this.tempCallback}/></div>
          <div className="col-xs-6"><Card /></div>
        </div>
      </div>
    )
  }
})

module.exports = App
