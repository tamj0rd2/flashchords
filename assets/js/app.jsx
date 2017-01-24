var React = require('react')
var Settings = require('./components/settings')
var QA = require('./scripts/qa.jsx')

require('../css/app.scss')
require('../css/card.scss')
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
        <div className="card">
          <div className="cardBtn question" onClick={this.resetCard}>
            <strong>{this.state.question.tonic}</strong>{this.state.question.type}
          </div>
          <div className={this.state.answerClass} onClick={this.showAnswer}>
            {this.state.answerText}
          </div>
        </div>
        <Settings callback={this.tempCallback}/>
      </div>
    )
  }
})

module.exports = App
