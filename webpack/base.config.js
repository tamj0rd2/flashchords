var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: __dirname,

  // entry point of the app
  entry: '../assets/js/index',

  output: {
    // where compiled bundles should be stored
    path: path.resolve('./assets/bundles/'),
    // the naming convention webpack will use for files
    filename: '[name]-[hash].js'
  },

  plugins: [
    // makes jQuery available in every module
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],

  module: {
    preLoaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
    ]
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  }
}
