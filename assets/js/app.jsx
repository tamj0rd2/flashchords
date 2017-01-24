var React = require('react')
var Settings = require('./components/settings')
var Card = require('./components/card')
var QA = require('./scripts/qa.jsx')
require('../css/app.scss')
require('../css/checkbox.scss')


var App = React.createClass({
  getInitialState: function () {
    return {
      question: QA.newQuestion(),
      answerText: 'Flip',
      answerClass: 'cardBtn answer',
    }
  },
  resetCard: function () {
    this.setState(this.getInitialState())
  },
  showAnswer: function () {
    // shows the answer and makes relevant class name change
    this.setState({answerText: this.state.question.answer.join(', ')})
    this.setState({answerClass: 'cardBtn answer flipped'})
  },
  tempCallback: function(checkboxVals) {
    // will be used to pass the selection of chord groups to the Card
    // so that new questions can be filtered by chord group
    console.log(`Checkbox values are: [${checkboxVals.join(', ')}]`)
  },
  render: function() {
    return (
      <div className="container">
        <Card
          question={this.state.question}
          answerText={this.state.answerText}
          answerClass={this.state.answerClass}
          resetCard={this.resetCard}
          showAnswer={this.showAnswer}
        />
        <Settings callback={this.tempCallback}/>
      </div>
    )
  }
})

module.exports = App
