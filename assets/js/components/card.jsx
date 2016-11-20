var React = require('react')


var Question = React.createClass({
  getInitialState: function () {
    return {
      chord: 'C',
    }
  },
  render: function () {
    return (
      <div>{this.state.chord}</div>
    )
  }
})

var Answer = React.createClass({
  getInitialState: function () {
    return {
      text: 'Flip',
      answer: 'C, E, G',
    }
  },
  render: function () {
    return (
      <div>{this.state.text}</div>
    )
  }
})

var Card = React.createClass({
  render: function() {
    return (
      <div className="Card">
        <Question />
        <Answer />
      </div>
    )
  }
})

module.exports = Card
