var React = require('react')
require('../../css/card.scss')


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
      clickCount: 0,
    }
  },
  onClick: function () {
    let clickCount = this.state.clickCount % 2
    if (clickCount === 0) {
      this.showAnswer()
    } else {
      this.showFlip()
    }
    this.setState({'clickCount': clickCount + 1})
  },
  showAnswer: function () {
    this.setState({'text': 'C, E, G'})
  },
  showFlip: function() {
    this.setState({'text': 'Flip'})
  },
  render: function () {
    return (
      <li className="list-group-item noSelect" unselectable="on"
          onClick={this.onClick}>{this.state.text}</li>
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
