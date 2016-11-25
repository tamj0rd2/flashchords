var React = require('react')


var SimpleLI = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
  },
  render: function () {
    return <li className="list-group-item">{this.props.text}</li>
  }
})

var Question = React.createClass({
  getInitialState: function () {
    return {
      chord: 'C',
    }
  },
  render: function () {
    return (
      <SimpleLI text={this.state.chord}/>
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
      <SimpleLI text={this.state.text}/>
    )
  }
})

var Card = React.createClass({
  render: function() {
    return (
      <ul className="list-group">
        <Question />
        <Answer />
      </ul>
    )
  }
})

module.exports = Card
