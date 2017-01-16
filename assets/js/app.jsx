var React = require('react')
var Settings = require('./components/settings')
var Card = require('./components/card')
require('../css/app.scss')
require('../css/checkbox.scss')

var App = React.createClass({
  tempCallback: function(checkboxVals) {
    // will be used to pass the selection of chord groups to the Card
    // so that new questions can be filtered by chord group
    console.log(`Checkbox values are: [${checkboxVals.join(', ')}]`)
  },
  render: function() {
    return (
      <div className="container">
        <Card />
        <Settings callback={this.tempCallback}/>
      </div>
    )
  }
})

module.exports = App
