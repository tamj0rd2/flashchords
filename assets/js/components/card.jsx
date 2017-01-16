var React = require('react')
var QA = require('../scripts/qa.jsx')
require('../../css/card.scss')


var Card = React.createClass({
  getInitialState: function () {
    return {
      question: QA.newQuestion(),
      text: 'Flip',
      answerClass: 'cardBtn answer'
    }
  },
  questionClick: function () {
    // show a new question and set the answer back to its inital state
    this.setState({question: QA.newQuestion()})
    this.setState({text: 'Flip'})
    this.setState({answerClass: 'cardBtn answer'})
  },
  answerClick: function () {
    // shows the answer and makes relevant class name change
    this.setState({text: this.state.question.answer.join(', ')})
    this.setState({answerClass: 'cardBtn answer flipped'})
  },
  render: function () {
    return (
      <div className="card">
        <div className="cardBtn question" onClick={this.questionClick}>
          <strong>{this.state.question.tonic}</strong>{this.state.question.type}
        </div>
        <div className={this.state.answerClass} onClick={this.answerClick}>
          {this.state.text}
        </div>
      </div>
    )
  }
})

module.exports = Card
