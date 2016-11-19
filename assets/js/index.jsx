var React = require('react')
var ReactDOM = require('react-dom')
var App = require('./app')
require('bootstrap-webpack')


ReactDOM.render(
  <App />,
  document.getElementById('react-app')
)

// required to enable hot-reloading of modules
if (module.hot) {
  module.hot.accept()
}
