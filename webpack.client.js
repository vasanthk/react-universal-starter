// Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand.
var webpack = require("webpack");
// Path contains utilities for handling and transforming file paths.
// Almost all these methods perform only string transformations. The file system is not consulted to check whether paths are valid.
var path = require("path");

module.exports = {
  target: 'web',  // Compile for usage in a browser-like environment (default)
  cache: false, // If true, caches generated modules and chunks to improve performance for multiple incremental builds.
  context: __dirname,  // The base directory (absolute path!) for resolving the entry option.
  devtool: false, // If set, specifies options to choose a developer tool to enhance debugging
  entry: ['./src/client'],  // The entry point for the bundle.
  output: { // Options affecting the output.
    path: path.join(__dirname, 'static/dist'),  // The output directory as absolute path (required)
    filename: 'client.js',  // The filename of the entry chunk as relative path inside the output.path directory.
    chunkFilename: '[name].[id].js',  // The filename of non-entry chunks as relative path inside the output.path directory.
    publicPath: 'dist/' // The output.path from the view of the Javascript / HTML page.
  },
  plugins: [
    // Set globals
    new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),

    // It will replace all instances of process.env.NODE_ENV with the string 'production'.
    // When used in conjunction with the uglify plugin, all the code in React that is inside a dev only conditional like if ('production' !== process.env.NODE_ENV) { ... } will be stripped.
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),

    // Search for equal or similar files and deduplicate them in the output.
    // This comes with some overhead for the entry chunk, but can reduce file size effectively.
    new webpack.optimize.DedupePlugin(),

    // Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids.
    // This make ids predictable, reduces to total file size and is recommended.
    new webpack.optimize.OccurenceOrderPlugin(),

    // Minimize all JavaScript output of chunks. Loaders are switched into minimizing mode.
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {include: /\.json$/, loaders: ['json-loader']},
      {include: /\.js$/, loaders: ['babel-loader?stage=0&optional=runtime&plugins=typecheck'], exclude: /node_modules/}
    ]
  },
  resolve: {
    // An array of directory names to be resolved to the current directory as well as its ancestors, and searched for modules.
    modulesDirectories: [
      'src',
      'node_modules',
      'web_modules'
    ],
    // An array of extensions that should be used to resolve modules.
    extensions: ['', '.json', '.js']
  },
  // Include polyfills or mocks for various node stuff
  node: {
    __dirname: true,  // real dirname
    fs: 'empty'
  }
};
