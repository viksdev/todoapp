var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: process.env.NODE_ENV !== "production" ? 'inline-source-map' : null,
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/only-dev-server',
    './app'
  ],
  externals: {
    Config : JSON.stringify(require('./config/default.json'))
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/app/',
    path: path.join(__dirname, '/app'),
  },
  resolve: {
    modulesDirectories: ['node_modules', 'app'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|semantic)/,
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
