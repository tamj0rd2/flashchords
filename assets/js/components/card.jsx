var React = require('react')


var Question = React.createClass({
  render: function () {
    return <div>Question</div>
  }
})

var Answer = React.createClass({
  render: function () {
    return <div>Answer</div>
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
