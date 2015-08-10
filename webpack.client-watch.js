var webpack = require('webpack');
var config = require('./webpack.client.js');

var hostname = process.env.HOSTNAME || "localhost";

config.cache = true;  // Cache generated modules and chunks to improve performance for multiple incremental builds.
config.debug = true;  // Switch loaders to debug mode
config.devtool = 'eval';  // Each module is executed with eval and //@ sourceURL

config.entry.unshift( // Unshift adds more entry points beginning of the array
  'webpack-dev-server/client?http://' + hostname + ':8080',
  'webpack/hot/only-dev-server'
);

// The output.path from the view of the Javascript / HTML page.
config.output.publicPath = 'http://' + hostname + ':8080/dist/';
// The filename of the Hot Update Main File. It is inside the output.path directory.
config.output.hotUpdateMainFilename = 'update/[hash]/update.json';
// The filename of the Hot Update Chunks. They are inside the output.path directory.
config.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js';

config.plugins = [
  // Set globals
  new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
  // It’s like LiveReload for every module. It exchanges, adds or removes modules while an application is running without page reload.
  new webpack.HotModuleReplacementPlugin(),
  // Hot loader is better when used with NoErrorsPlugin and hot/only-dev-server since it eliminates page reload altogether and recovers after syntax errors.
  new webpack.NoErrorsPlugin()
];

config.module = {
  loaders: [
    {include: /\.json$/, loaders: ['json-loader']},
    {
      include: /\.js$/,
      loaders: ['react-hot', 'babel-loader?stage=0&optional=runtime&plugins=typecheck'],
      exclude: /node_modules/
    }
  ]
};

// The webpack-dev-server is a little node.js Express server, which uses the webpack-dev-middleware to serve a webpack bundle.
// It also has a little runtime which is connected to the server via Socket.IO.
config.devServer = {
  publicPath: 'http://' +hostname + ':8080/dist/',
  contentBase: './static',
  hot: true,  // Enable special support for Hot Module Replacement
  inline: true, // Using this config webpack-dev-server will serve the static files in your build folder and watch your source files for changes.

  // webpack-dev-middleware options
  lazy: false,
  quiet: true,  // don’t output anything to the console
  noInfo: false,  // suppress boring information
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true},
  host: hostname // hostname or IP
};

module.exports = config;
