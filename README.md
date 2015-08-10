# React-Universal-Starter
Fully *annotated code* for quick starting an *Universal (isomorphic) React App*.
Thanks to Rick Wong!

Universal starterkit with server-side React rendering using 
[npm](https://www.npmjs.com/), 
[piping](https://github.com/mdlawson/piping), 
[webpack](https://webpack.github.io/), 
[webpack-dev-server](https://github.com/webpack/webpack-dev-server),
[hapi.js](http://www.hapijs.com/), 
[babel.js](http://babeljs.io/), 
[react.js](https://facebook.github.io/react), 
[react-router](https://github.com/rackt/react-router), 
[react-hot-loader](https://gaearon.github.io/react-hot-loader), 
[react-transmit](https://github.com/RickWong/react-transmit),
[react-inline-css](https://github.com/RickWong/react-inline-css)

## Features

- Fully automated with npm run scripts
- Server hot reloads with piping and Hapi.js
- Webpack for watch + production builds
- React.js + Router on the client and server
- React Hot Loader for instant client updates
- Babel.js automatically compiles ES6 + ES7
- React Transmit to preload on server to client
- InlineCss-component for styling components
- Accessibility hints from react-a11y

It just works out-of-the-box.

## Installation

```bash
	git clone https://github.com/RickWong/react-isomorphic-starterkit.git
	cd react-isomorphic-starterkit
	
	npm install
	npm run watch     # Yes, ONE command for server AND client development!
	
	# production build and run
	NODE_ENV=production npm run build
	NODE_ENV=production npm run start  
```

Go To http://localhost:8000/

## Usage

Run `npm run watch` in your terminal and play with `views/Main.js` to get a feel of
the server-side rendering and client-side hot updates.

## More info
### Dependencies:
```babel```: Turns ES6 code into readable vanilla ES5 with source maps

```babel-plugin-typecheck```: Transforms flow (JavaScript static type checker) type annotations into runtime type checks.

```hapi```: hapi is a simple to use configuration-centric node.j framework with built-in support for input validation, caching, authentication, and other essential facilities for building web and services applications.

```isomorphic-fetch```: Fetch API (window.fetch) for node. This adds fetch as a global so that its API is consistent between client and server. The Fetch API provides an interface for fetching resources (e.g. across the network). It will seem familiar to anyone who has used XMLHttpRequest, but the new API provides a more powerful and flexible feature set.

```piping```: Piping adds "hot reloading" functionality to node, watching all your project files and reloading when anything changes, without requiring a "wrapper" binary.

```react```: A JavaScript library for building User interfaces.

```react-inline-css```: Allows you to write traditional CSS stylesheets in your components, automatically namespacing them for you.

```react-router```: RAllows you to define routes in your React application in a declarative manner, directly as a part of your component hierarchy. It painlessly synchronizes the components of your application with the URL, with first-class support for nesting, transitions, and server side rendering.

```react-transmit```: Relay-inspired library based on Promises instead of GraphQL.


### Dev Dependencies:
```babel-core```: Same as babel, but without the commandline interface.

```babel-loader```: Babel module loader for webpack.

```babel-runtime```: Runtime support for output of Babel transpiler. Babel has a polyfill, which provides most of the non-finalised features of ES6, including Object.assign. Feeding Babel the optional: [“runtime”] engages these features.

```concurrently```: Run multiple commands concurrently. The usual way to run multiple commands concurrently is npm run watch-js & npm run watch-css. That's fine but it's hard to keep on track of different outputs. Also if one process fails, others still keep running and you won't even notice the difference.

```json-loader```: json loader module for webpack. Don't forget to polyfill require if you want to use it in node.

```react-hot-loader```: Tweak React components in real time.
 
```webpack```: Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jade, coffee, css, less, ... and your custom stuff.

```webpack-dev-server```: A live reloading server for webpack.
