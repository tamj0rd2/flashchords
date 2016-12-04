var React = require('react')
var QA = require('../scripts/qa.jsx')
require('../../css/card.scss')


var Card = React.createClass({
  getInitialState: function () {
    return {
      question: QA.newQuestion(),
      text: 'Flip',
    }
  },
  questionClick: function () {
    this.setState({question: QA.newQuestion()})
    this.setState({text: 'Flip'})
  },
  answerClick: function () {
    this.setState({text: this.state.question.answer.join(', ')})
  },
  render: function () {
    return (
      <ul className="list-group" onClick={this.onClick}>
        <li className="list-group-item no-select" onClick={this.questionClick}>
          <strong>{this.state.question.tonic}</strong>{this.state.question.type}
        </li>
        <li className="list-group-item no-select" onClick={this.answerClick}>
          {this.state.text}
        </li>
      </ul>
    )
  }
})

module.exports = Card
