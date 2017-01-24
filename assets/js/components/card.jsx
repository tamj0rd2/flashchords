var React = require('react')
require('../../css/card.scss')


var Card = React.createClass({
  propTypes: {
    question: React.PropTypes.object.isRequired,
    answerText: React.PropTypes.string.isRequired,
    answerClass: React.PropTypes.string.isRequired,
    resetCard: React.PropTypes.func.isRequired,
    showAnswer: React.PropTypes.func.isRequired
  },
  render: function () {
    return (
      <div className="card">
        <div className="cardBtn question" onClick={this.props.resetCard}>
          <strong>{this.props.question.tonic}</strong>{this.props.question.type}
        </div>
        <div className={this.props.answerClass} onClick={this.props.showAnswer}>
          {this.props.answerText}
        </div>
      </div>
    )
  }
})

module.exports = Card
