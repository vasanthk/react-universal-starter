require('babel/register')({
  stage: 0, // has experimental support for ES7 proposals
  plugins: ['typecheck']  // Static and runtime type checking for JavaScript in the form of a Babel plugin
});

/**
 * Define isomorphic/universal constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;

if (process.env.NODE_ENV !== 'production') {
  // Piping enabled live code reloading.
  // hook into node's 'require' function and only watch required files instead of all files in the folder in which main resides.
  if (!require('piping')({hook: true})) {
    return;
  }
}

require('./src/server');
